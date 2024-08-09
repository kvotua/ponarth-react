import asyncio
import logging
import aiohttp
from aiogram import Bot, Dispatcher, types
from aiogram.filters.command import Command
from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup, BotCommand
from dotenv import load_dotenv
import os

logging.basicConfig(level=logging.INFO)

# Print the current working directory
print(f"Current working directory: {os.getcwd()}")

load_dotenv(dotenv_path='.env')
API_TOKEN = os.getenv("BOT_TOKEN")
print(f"API_TOKEN: {API_TOKEN}")  

bot = Bot(token=API_TOKEN)
dp = Dispatcher()

async def check_server_status(session):
    async with session.get('https://backend.ponarth.com/api/settings/ping') as response:
        return response.status == 200

async def check_user_exists(session, username):
    async with session.post('https://backend.ponarth.com/api/auth/login', json={"username": username}) as response:
        if response.status == 200:
            data = await response.json()
            token = data.get("accessToken")
            print(f"Token: {token}")
            return token
        return None

async def send_welcome_message(message, token):
    button_web_app = InlineKeyboardButton(
        text="Админ-панель", 
        web_app=types.WebAppInfo(url=f"https://admin.ponarth.com/?token={token}")
    )

    button_link = InlineKeyboardButton(text="Сайт пивоварни Ponarth", url="https://brauerei.ponarth.com/")
    keyboard = InlineKeyboardMarkup(inline_keyboard=[[button_web_app], [button_link]])
    
    photo_url = 'https://postimg.cc/r0ZdWg82'
    await message.answer_photo(photo_url, caption="Добро пожаловать в админ-панель!", reply_markup=keyboard)

@dp.message(Command("start"))
async def cmd_start(message: types.Message):
    username = message.from_user.username  # Username

    async with aiohttp.ClientSession() as session:
        server_status = await check_server_status(session)
        if server_status:
            token = await check_user_exists(session, username)
            if token:
                await send_welcome_message(message, token)
            else:
                await message.answer("Вас должны зарегистрировать")
        else:
            await message.answer("Сервер недоступен")
        
        await set_main_menu(bot)  # Устанавливаем главное меню в любом случае

async def set_main_menu(bot: Bot):
    # Создаем список с командами и их описанием для кнопки menu
    main_menu_commands = [
        BotCommand(command='/start', description='Старт'),
        BotCommand(command='/help', description='Помощь'),
        BotCommand(command='/regnewuser', description='Зарегистрировать нового пользователя'),
    ]
    await bot.set_my_commands(main_menu_commands)

async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
