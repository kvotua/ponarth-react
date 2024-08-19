import asyncio
import logging
import aiohttp
from aiogram import Bot, Dispatcher, types, F
from aiogram.filters.command import Command
from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup, BotCommand
from dotenv import load_dotenv
from aiogram.types import User
import os

from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import StatesGroup, State
from aiogram.fsm.storage.memory import MemoryStorage

logging.basicConfig(level=logging.INFO)

# Print the current working directory
print(f"Current working directory: {os.getcwd()}")

load_dotenv(dotenv_path='.env')
API_TOKEN = os.getenv("BOT_TOKEN")
print(f"API_TOKEN: {API_TOKEN}")  
bot = Bot(token=API_TOKEN)
storage = MemoryStorage()
dp = Dispatcher(storage=storage)

class UserRegistration(StatesGroup):
    waiting_for_contact = State()

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
    
async def reg_new_user(session, id, username, nameAndLastname, username_admin):
    async with session.post('https://backend.ponarth.com/api/auth/login', json={"username": username_admin}) as response:
        if response.status == 200:
            data = await response.json()
            token = data.get("accessToken")
            logging.info(token)
            headers = {
                f'Authorization': f'Bearer {token}'
            }
            async with session.post('https://backend.ponarth.com/api/auth/registration', 
                                    json={"id": id ,
                                          "username": username,
                                          "nameAndLastname": nameAndLastname,
                                          "roles": ["ADMIN"] },
                                    headers=headers) as response2:
                if response2.status == 200:
                    return 1
                else:
                    return 0
        else:
            return -1

async def send_welcome_message(message, token):
    button_web_app = InlineKeyboardButton(
        text="Админ-панель", 
        web_app=types.WebAppInfo(url=f"https://admin.ponarth.com/?token={token}")
    )

    button_link = InlineKeyboardButton(text="Сайт пивоварни Ponarth", url="https://brauerei.ponarth.com/")
    keyboard = InlineKeyboardMarkup(inline_keyboard=[[button_web_app], [button_link]])
    
    photo_url = 'https://postimg.cc/r0ZdWg82'
    await message.answer_photo(photo_url, caption="Добро пожаловать в админ-панель!", reply_markup=keyboard)

async def send_welcome_message_user_id(bot: Bot, user_id: int, token: str):
    button_web_app = InlineKeyboardButton(
        text="Админ-панель", 
        web_app=types.WebAppInfo(url=f"https://admin.ponarth.com/?token={token}")
    )

    button_link = InlineKeyboardButton(text="Сайт пивоварни Ponarth", url="https://brauerei.ponarth.com/")
    keyboard = InlineKeyboardMarkup(inline_keyboard=[[button_web_app], [button_link]])
    
    photo_url = 'https://postimg.cc/r0ZdWg82'
    
    await bot.send_photo(user_id, photo=photo_url, caption="Добро пожаловать в админ-панель!", reply_markup=keyboard)

@dp.message(Command("start"))
async def cmd_start(message):
    username = message.from_user.username
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
        
        await set_main_menu(bot)

@dp.message(Command("regnewuser"))
async def cmd_regnewuser(message, state: FSMContext):
    username = message.from_user.username

    async with aiohttp.ClientSession() as session:
        server_status = await check_server_status(session)
        if server_status:
            token = await check_user_exists(session, username)
            if token:
                await message.answer("Отправьте контакт человека которого вы хотите зарегистрировать")
                await state.set_state(UserRegistration.waiting_for_contact) 
            else:
                await message.answer("Вас должны зарегистрировать")
        else:
            await message.answer("Сервер недоступен")

@dp.message(UserRegistration.waiting_for_contact)
async def handle_contact(message: types.Message, state: FSMContext):
    if message.contact:
        contact = message.contact
        nameAndLastname = ''
        name = ''
        if contact.last_name:
            nameAndLastname = f'{contact.first_name};{contact.last_name}'
            name = f'{contact.first_name} {contact.last_name}'
        else:
            nameAndLastname = f'{contact.first_name}'
            name = f'{contact.first_name}'
        username = await get_username_by_user_id(bot, contact.user_id)
        if username == None:
            await message.answer(f"Пусть пользователь отправит {contact.first_name} боту команду /start")
        else:
            async with aiohttp.ClientSession() as session:
                status = await reg_new_user(session, contact.user_id, username, nameAndLastname, message.from_user.username)
                if status == 1:
                    await message.answer(f"Контакт {name} успешно зарегистрирован!")
                else:
                     await message.answer(f"Ошибка регистрации")
                if status == -1:
                    await message.answer(f"Ошибка телеграмм")

        await state.clear()
    else:
        await message.answer("Пожалуйста, отправьте контакт.")

async def get_username_by_user_id(bot: Bot, user_id: int) -> str:
    try:
        user: User = await bot.get_chat(user_id)
        return user.username if user.username else "Username не установлен"
    except Exception as e:
        print(f"Произошла ошибка: {e}")
        return None

@dp.message(UserRegistration.waiting_for_contact)
async def ignore_unexpected_messages(message: types.Message):
    await message.answer("Пожалуйста, отправьте контакт.")

async def set_main_menu(bot: Bot):
    main_menu_commands = [
        BotCommand(command='/start', description='Старт'),
        BotCommand(command='/help', description='Помощь'),
        BotCommand(command='/regnewuser', description='Зарегистрировать нового пользователя'),
    ]
    await bot.set_my_commands(main_menu_commands)

async def main():
    try:
        await dp.start_polling(bot)
    finally:
        await bot.session.close() 

if __name__ == "__main__":
    asyncio.run(main())
