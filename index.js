

// require('dotenv').config();
// const { Telegraf, Markup } = require('telegraf');
// const axios = require('axios');
// const express = require('express');
// const bodyParser = require('body-parser');
// const { db } = require('./firebase');

// // Инициализация бота с использованием переменных окружения
// const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
// const cryptoPayApiKey = process.env.CRYPTOPAY_API_KEY; // API ключ для криптоплатежей

// // Обработка команды /start с реферальной системой
// bot.start((ctx) => {
//   const userId = ctx.from.id; // Получаем ID пользователя, вызвавшего команду /start
//   console.log(`ID пользователя, вызвавшего команду /start: ${userId}`);

//   const messageText = ctx.message.text || ''; // Проверяем, есть ли текст
//   const startParam = messageText.split(' ')[1]; // Получаем параметр после /start

//   // Если есть параметр "start", то это реферальная ссылка
//   if (startParam && startParam.includes('owner_')) {
//     const ownerId = startParam.split('_')[1]; // Извлекаем ID пригласившего
//     console.log(`ID пригласившего: ${ownerId}`);

//     // Отправляем POST-запрос на сервер для создания реферальной записи
//     // Отправляем POST-запрос на сервер для создания реферальной записи
// const url = `https://4v-news-api.azurewebsites.net/Games4V/Referral/Create?TelegramUserId=${ownerId}&TelegramChildUserId=${userId}`;
// console.log(`Отправляем запрос на сервер: ${url}`);

// axios.post(url)
//   .then((response) => {
//     console.log('Успешный ответ сервера:', response.data);
//     ctx.reply('Вы успешно зарегистрированы как реферал!');
//   })
//   .catch((error) => {
//     console.error('Ошибка при создании реферальной записи:', error.response ? error.response.data : error.message);
//     ctx.reply('Произошла ошибка при регистрации реферала.');
//   })

//   .then((response) => {
//     ctx.reply('Вы успешно зарегистрированы как реферал!');
//   })
//   .catch((error) => {
//     console.error('Ошибка при создании реферальной записи:', error.response ? error.response.data : error.message);
//     ctx.reply('Произошла ошибка при регистрации реферала.');
//   });

//   } else {
//     console.log('Параметр start отсутствует, генерируем реферальную ссылку для текущего пользователя.');
//   }

//   // Генерация реферальной ссылки
//   const referralLink = `https://t.me/FOUR_V_DOT_ROBOT_bot?start=owner_${userId}`;
//   console.log(`Сгенерирована реферальная ссылка: ${referralLink}`);

//   // Отправляем пользователю сообщение с кнопками для перехода на веб-приложение
//   ctx.telegram.sendMessage(ctx.chat.id, 'Откройте веб-приложение:', {
//     reply_markup: {
//       inline_keyboard: [
//         [
//           { text: 'Скопировать ссылку', callback_data: 'copy_referral_link' },
//           { text: '🤖 4V.ROBOT', web_app: { url: `https://test4vcoin.web.app/?start=owner_${userId}` } },
//           { text: '🪙 4V.COIN', web_app: { url: `https://test4vcoin.web.app/?start=owner_${userId}` } }
//         ]
//       ]
//     }
//   }).catch((err) => {
//     console.error('Ошибка при отправке сообщения:', err);
//   });
// });

// // Обработка callback для копирования ссылки
// // Обработка callback для копирования ссылки
// // Обработка callback для копирования ссылки
// bot.action('copy_referral_link', (ctx) => {
//   const referralLink = `https://t.me/FOUR_V_DOT_ROBOT_bot?start=owner_${ctx.from.id}`;
  
//   // Отправляем ссылку пользователю, чтобы он мог её скопировать вручную
//   ctx.reply(`Скопируйте эту ссылку: ${referralLink}`);
//   ctx.answerCbQuery('Ссылка отправлена в чат!');
//   console.log(`Ссылка для копирования: ${referralLink}`);
// });



// // Обработка команды /pay
// bot.command('pay', (ctx) => {
//   ctx.reply('Выберите валюту для оплаты:', Markup.inlineKeyboard([
//     Markup.button.callback('BTC', 'pay_btc'),
//     Markup.button.callback('USDT', 'pay_usdt'),
//     Markup.button.callback('TON', 'pay_ton')
//   ]));
// });

// // Функция для создания счета (инвойса) на оплату
// const createInvoice = async (ctx, asset) => {
//   let amount = 0.1; // Сумма эквивалентная 50 USDT для всех валют

//   try {
//     const response = await axios.post('https://pay.crypt.bot/api/createInvoice', {
//       asset, // Валюта
//       amount, // Сумма
//       description: 'Оплата за услуги', // Описание платежа
//       hidden_message: 'Спасибо за ваш платеж!', // Сообщение после оплаты
//       paid_btn_name: 'callback', // Кнопка для продолжения после оплаты
//       paid_btn_url: 'https://goodnewsexpress.com', // URL для перехода после оплаты
//       payload: JSON.stringify({ userId: ctx.from.id }) // Передача ID пользователя
//     }, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Crypto-Pay-API-Token': cryptoPayApiKey // Аутентификация с помощью API ключа
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

// // Обработка нажатия кнопки оплаты
// bot.action('pay_btc', (ctx) => createInvoice(ctx, 'BTC'));
// bot.action('pay_usdt', (ctx) => createInvoice(ctx, 'USDT'));
// bot.action('pay_ton', (ctx) => createInvoice(ctx, 'TON'));

// // Проверка статуса оплаты
// const checkPaymentStatus = async (userId) => {
//   const userDoc = await db.collection('users').doc(userId.toString()).get();
//   return userDoc.exists && userDoc.data().hasPaid;
// };

// // Обработка команды /use_service
// bot.command('use_service', async (ctx) => {
//   const hasPaid = await checkPaymentStatus(ctx.from.id);
//   if (hasPaid) {
//     ctx.reply('Добро пожаловать! Вы можете использовать наш сервис.');
//   } else {
//     ctx.reply('Извините, вы должны оплатить доступ, используя команду /pay.');
//   }
// });

// // Запуск бота с использованием long polling
// bot.launch();
// console.log('Бот запущен с использованием long polling...');

// // Создание Express-сервера для обработки webhook уведомлений от платежей
// const app = express();
// app.use(bodyParser.json());

// app.post('/webhook', async (req, res) => {
//   const update = req.body;

//   if (update && update.ok) {
//     const invoice = update.result;

//     if (invoice.status === 'paid') {
//       const userId = JSON.parse(invoice.payload).userId; // Получаем ID пользователя из инвойса
//       await db.collection('users').doc(userId.toString()).set({
//         hasPaid: true // Обновляем статус оплаты в базе данных
//       }, { merge: true });
//     }
//   }

//   res.sendStatus(200); // Возвращаем статус успешной обработки
// });

// // Настройка порта для прослушивания запросов
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Сервер запущен на порту ${PORT}`);
// });
require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const { db } = require('./firebase');

// Инициализация бота с использованием переменных окружения
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const cryptoPayApiKey = process.env.CRYPTOPAY_API_KEY; // API ключ для криптоплатежей

// Обработка команды /start с реферальной системой
bot.start((ctx) => {
  const userId = ctx.from.id; // Получаем ID пользователя, вызвавшего команду /start
  console.log(`ID пользователя, вызвавшего команду /start: ${userId}`);

  const messageText = ctx.message.text || ''; // Проверяем, есть ли текст
  const startParam = messageText.split(' ')[1]; // Получаем параметр после /start

  // Если есть параметр "start", то это реферальная ссылка
  if (startParam && startParam.includes('owner_')) {
    const ownerId = startParam.split('_')[1]; // Извлекаем ID пригласившего
    console.log(`ID пригласившего: ${ownerId}`);

    // Отправляем POST-запрос на сервер для создания реферальной записи
    const url = `https://4v-news-api.azurewebsites.net/Games4V/Referral/Create?TelegramUserId=${ownerId}&TelegramChildUserId=${userId}`;
    console.log(`Отправляем запрос на сервер: ${url}`);

    axios.post(url)
      .then((response) => {
        console.log('Успешный ответ сервера:', response.data);
        ctx.reply('Вы успешно зарегистрированы как реферал!');
      })
      .catch((error) => {
        console.error('Ошибка при создании реферальной записи:', error.response ? error.response.data : error.message);
        ctx.reply('Произошла ошибка при регистрации реферала.');
      });
  } else {
    console.log('Параметр start отсутствует, генерируем реферальную ссылку для текущего пользователя.');
  }

  // Генерация реферальной ссылки
  const referralLink = `https://t.me/FOUR_V_DOT_ROBOT_bot?start=owner_${userId}`;
  console.log(`Сгенерирована реферальная ссылка: ${referralLink}`);

  // Отправляем пользователю сообщение с кнопками для перехода на веб-приложение
  ctx.telegram.sendMessage(ctx.chat.id, 'Откройте веб-приложение:', {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Скопировать ссылку', callback_data: 'copy_referral_link' },
          { 
            text: '🤖 Открыть Web App', 
            web_app: { url: `https://test4vcoin.web.app/?start=owner_${userId}` } // Ссылка для открытия через Telegram Web App
          }
        ]
      ]
    }
  }).catch((err) => {
    console.error('Ошибка при отправке сообщения:', err);
  });
});

// Обработка callback для копирования ссылки
bot.action('copy_referral_link', (ctx) => {
  const referralLink = `https://t.me/FOUR_V_DOT_ROBOT_bot?start=owner_${ctx.from.id}`;
  
  // Отправляем ссылку пользователю, чтобы он мог её скопировать вручную
  ctx.reply(`Скопируйте эту ссылку: ${referralLink}`);
  ctx.answerCbQuery('Ссылка отправлена в чат!');
  console.log(`Ссылка для копирования: ${referralLink}`);
});

// Обработка команды /pay
bot.command('pay', (ctx) => {
  ctx.reply('Выберите валюту для оплаты:', Markup.inlineKeyboard([
    Markup.button.callback('BTC', 'pay_btc'),
    Markup.button.callback('USDT', 'pay_usdt'),
    Markup.button.callback('TON', 'pay_ton')
  ]));
});

// Функция для создания счета (инвойса) на оплату
const createInvoice = async (ctx, asset) => {
  let amount = 0.1; // Сумма эквивалентная 50 USDT для всех валют

  try {
    const response = await axios.post('https://pay.crypt.bot/api/createInvoice', {
      asset, // Валюта
      amount, // Сумма
      description: 'Оплата за услуги', // Описание платежа
      hidden_message: 'Спасибо за ваш платеж!', // Сообщение после оплаты
      paid_btn_name: 'callback', // Кнопка для продолжения после оплаты
      paid_btn_url: 'https://goodnewsexpress.com', // URL для перехода после оплаты
      payload: JSON.stringify({ userId: ctx.from.id }) // Передача ID пользователя
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Crypto-Pay-API-Token': cryptoPayApiKey // Аутентификация с помощью API ключа
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

// Обработка команды /use_service
bot.command('use_service', async (ctx) => {
  const hasPaid = await checkPaymentStatus(ctx.from.id);
  if (hasPaid) {
    ctx.reply('Добро пожаловать! Вы можете использовать наш сервис.');
  } else {
    ctx.reply('Извините, вы должны оплатить доступ, используя команду /pay.');
  }
});

// Запуск бота с использованием long polling
bot.launch();
console.log('Бот запущен с использованием long polling...');

// Создание Express-сервера для обработки webhook уведомлений от платежей
const app = express();
app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
  const update = req.body;

  if (update && update.ok) {
    const invoice = update.result;

    if (invoice.status === 'paid') {
      const userId = JSON.parse(invoice.payload).userId; // Получаем ID пользователя из инвойса
      await db.collection('users').doc(userId.toString()).set({
        hasPaid: true // Обновляем статус оплаты в базе данных
      }, { merge: true });
    }
  }

  res.sendStatus(200); // Возвращаем статус успешной обработки
});

// Настройка порта для прослушивания запросов
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
