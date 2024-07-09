// require('dotenv').config();
// const { Telegraf, Markup } = require('telegraf');
// const axios = require('axios');

// const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
// const cryptoPayApiKey = process.env.CRYPTOPAY_API_KEY;

// bot.start((ctx) => ctx.reply('Добро пожаловать! Используйте команду /pay для оплаты.'));

// bot.command('pay', (ctx) => {
//   ctx.reply('Выберите валюту для оплаты:', Markup.inlineKeyboard([
//     Markup.button.callback('BTC', 'pay_btc'),
//     Markup.button.callback('USDT', 'pay_usdt'),
//     Markup.button.callback('TON', 'pay_ton')
//   ]));
// });

// const createInvoice = async (ctx, asset) => {
//   let amount;
//   switch (asset) {
//     case 'BTC':
//       amount = 0.001; // Сумма платежа для BTC
//       break;
//     case 'USDT':
//       amount = 50.0; // Сумма эквивалентная 50 USDT
//       break;
//     case 'TON':
//       amount = 50.0; // Сумма эквивалентная 50 USDT
//       break;
//     default:
//       amount = 0.001;
//   }

//   try {
//     const response = await axios.post('https://pay.crypt.bot/api/createInvoice', {
//       asset, // Валюта платежа
//       amount, // Сумма платежа
//       description: 'Оплата за услуги',
//       hidden_message: 'Спасибо за ваш платеж!',
//       paid_btn_name: 'callback',
//       paid_btn_url: 'https://goodnewsexpress.com',
//       payload: JSON.stringify({ userId: ctx.from.id })
//     }, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Crypto-Pay-API-Token': cryptoPayApiKey
//       }
//     });

//     if (response.data.ok) {
//       const invoiceUrl = response.data.result.pay_url;
//       ctx.reply(`Пожалуйста, совершите оплату по следующей ссылке: ${invoiceUrl}`);
//     } else {
//       console.error('Ошибка API:', response.data);
//       ctx.reply('Извините, произошла ошибка при создании платежа.');
//     }
//   } catch (error) {
//     if (error.response) {
//       console.error('Ошибка при создании счета:', error.response.data);
//       ctx.reply('Извините, произошла ошибка при создании платежа.');
//     } else if (error.request) {
//       console.error('Ошибка запроса:', error.request);
//       ctx.reply('Извините, произошла ошибка при создании платежа.');
//     } else {
//       console.error('Ошибка:', error.message);
//       ctx.reply('Извините, произошла ошибка при создании платежа.');
//     }
//   }
// };

// bot.action('pay_btc', (ctx) => createInvoice(ctx, 'BTC'));
// bot.action('pay_usdt', (ctx) => createInvoice(ctx, 'USDT'));
// bot.action('pay_ton', (ctx) => createInvoice(ctx, 'TON'));

// bot.launch();
// console.log('Бот запущен...');
require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const { db } = require('./firebase');

// Инициализация бота и переменных окружения
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const cryptoPayApiKey = process.env.CRYPTOPAY_API_KEY;

// Обработка команды /start
bot.start((ctx) => ctx.reply('Добро пожаловать! Используйте команду /pay для оплаты.'));

// Обработка команды /pay
bot.command('pay', (ctx) => {
  ctx.reply('Выберите валюту для оплаты:', Markup.inlineKeyboard([
    Markup.button.callback('BTC', 'pay_btc'),
    Markup.button.callback('USDT', 'pay_usdt'),
    Markup.button.callback('TON', 'pay_ton')
  ]));
});

// Функция для создания счета
const createInvoice = async (ctx, asset) => {
  let amount = 50.0; // Сумма эквивалентная 50 USDT для всех валют

  try {
    const response = await axios.post('https://pay.crypt.bot/api/createInvoice', {
      asset,
      amount,
      description: 'Оплата за услуги',
      hidden_message: 'Спасибо за ваш платеж!',
      paid_btn_name: 'callback',
      paid_btn_url: 'https://goodnewsexpress.com',
      payload: JSON.stringify({ userId: ctx.from.id })
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Crypto-Pay-API-Token': cryptoPayApiKey
      }
    });

    if (response.data.ok) {
      const invoiceUrl = response.data.result.pay_url;
      ctx.reply(`Пожалуйста, совершите оплату по следующей ссылке: ${invoiceUrl}`);
    } else {
      console.error('Ошибка API:', response.data);
      ctx.reply('Извините, произошла ошибка при создании платежа.');
    }
  } catch (error) {
    if (error.response) {
      console.error('Ошибка при создании счета:', error.response.data);
      ctx.reply('Извините, произошла ошибка при создании платежа.');
    } else if (error.request) {
      console.error('Ошибка запроса:', error.request);
      ctx.reply('Извините, произошла ошибка при создании платежа.');
    } else {
      console.error('Ошибка:', error.message);
      ctx.reply('Извините, произошла ошибка при создании платежа.');
    }
  }
};

// Обработка нажатия кнопки оплаты
bot.action('pay_btc', (ctx) => createInvoice(ctx, 'BTC'));
bot.action('pay_usdt', (ctx) => createInvoice(ctx, 'USDT'));
bot.action('pay_ton', (ctx) => createInvoice(ctx, 'TON'));

// Проверка статуса оплаты
const checkPaymentStatus = async (userId) => {
  const userDoc = await db.collection('users').doc(userId.toString()).get();
  return userDoc.exists && userDoc.data().hasPaid;
};

// Обработка команды использования сервиса
bot.command('use_service', async (ctx) => {
  const hasPaid = await checkPaymentStatus(ctx.from.id);
  if (hasPaid) {
    ctx.reply('Добро пожаловать! Вы можете использовать наш сервис.');
  } else {
    ctx.reply('Извините, вы должны оплатить доступ, используя команду /pay.');
  }
});

// Запуск бота
bot.launch();
console.log('Бот запущен...');

// Создание Express-сервера для обработки webhook уведомлений
const app = express();
app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
  const update = req.body;

  if (update && update.ok) {
    const invoice = update.result;

    if (invoice.status === 'paid') {
      const userId = JSON.parse(invoice.payload).userId;
      await db.collection('users').doc(userId.toString()).set({
        hasPaid: true
      }, { merge: true });
    }
  }

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
