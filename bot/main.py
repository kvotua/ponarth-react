import asyncio
import logging
from aiogram import Bot, Dispatcher, types
from aiogram.filters.command import Command
from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup
from dotenv import load_dotenv
import os

logging.basicConfig(level=logging.INFO)

load_dotenv(dotenv_path='./.env')
API_TOKEN = os.getenv("BOT_TOKEN")
print(f"API_TOKEN: {API_TOKEN}")  

bot = Bot(token=API_TOKEN)
dp = Dispatcher()

@dp.message(Command("start"))
async def cmd_start(message: types.Message):
    button_web_app = InlineKeyboardButton(text="Админ-панель", web_app=types.WebAppInfo(url="http://localhost:3003/"))
    button_link = InlineKeyboardButton(text="Сайт пивоварни Ponarth", url="https://brauerei.ponarth.com/")
    keyboard = InlineKeyboardMarkup(inline_keyboard=[[button_web_app], [button_link]])
    
    photo_url = 'https://postimg.cc/r0ZdWg82'
    await message.answer_photo(photo_url, caption="Добро пожаловать в админ-панель!", reply_markup=keyboard)

async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
