
// require('dotenv').config();
// const { Telegraf, Markup } = require('telegraf');
// const axios = require('axios');
// const express = require('express');
// const bodyParser = require('body-parser');
// const { db } = require('./firebase');

// // Инициализация бота и переменных окружения
// const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
// const cryptoPayApiKey = process.env.CRYPTOPAY_API_KEY;

// // Обработка команды /start
// bot.start((ctx) => {
//   ctx.reply('Добро пожаловать! Используйте команду /pay для оплаты.');
//   // Отправка кнопки для открытия веб-приложения
//   ctx.telegram.sendMessage(ctx.chat.id, 'Откройте веб-приложение 4V.ROBOT:', {
//     reply_markup: {
//       inline_keyboard: [
//         [{ text: '🌐 4V.ROBOT', web_app: { url: 'https://forexgoodnews.com' } }]
//       ]
//     }
//   });
// });

// // Обработка команды /pay
// bot.command('pay', (ctx) => {
//   ctx.reply('Выберите валюту для оплаты:', Markup.inlineKeyboard([
//     Markup.button.callback('BTC', 'pay_btc'),
//     Markup.button.callback('USDT', 'pay_usdt'),
//     Markup.button.callback('TON', 'pay_ton')
//   ]));
// });

// // Функция для создания счета
// const createInvoice = async (ctx, asset) => {
//   let amount = 0.1; // Сумма эквивалентная 50 USDT для всех валют

//   try {
//     const response = await axios.post('https://pay.crypt.bot/api/createInvoice', {
//       asset,
//       amount,
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

// // Обработка нажатия кнопки оплаты
// bot.action('pay_btc', (ctx) => createInvoice(ctx, 'BTC'));
// bot.action('pay_usdt', (ctx) => createInvoice(ctx, 'USDT'));
// bot.action('pay_ton', (ctx) => createInvoice(ctx, 'TON'));

// // Проверка статуса оплаты
// const checkPaymentStatus = async (userId) => {
//   const userDoc = await db.collection('users').doc(userId.toString()).get();
//   return userDoc.exists && userDoc.data().hasPaid;
// };

// // Обработка команды использования сервиса
// bot.command('use_service', async (ctx) => {
//   const hasPaid = await checkPaymentStatus(ctx.from.id);
//   if (hasPaid) {
//     ctx.reply('Добро пожаловать! Вы можете использовать наш сервис.');
//   } else {
//     ctx.reply('Извините, вы должны оплатить доступ, используя команду /pay.');
//   }
// });

// // Запуск бота
// bot.launch();
// console.log('Бот запущен с использованием long polling...');

// // Создание Express-сервера для обработки webhook уведомлений
// const app = express();
// app.use(bodyParser.json());

// app.post('/webhook', async (req, res) => {
//   const update = req.body;

//   if (update && update.ok) {
//     const invoice = update.result;

//     if (invoice.status === 'paid') {
//       const userId = JSON.parse(invoice.payload).userId;
//       await db.collection('users').doc(userId.toString()).set({
//         hasPaid: true
//       }, { merge: true });
//     }
//   }

//   res.sendStatus(200);
// });

// // Настройка порта для прослушивания
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Сервер запущен на порту ${PORT}`);
// });
// require('dotenv').config();
// const { Telegraf, Markup } = require('telegraf');
// const axios = require('axios');
// const express = require('express');
// const bodyParser = require('body-parser');
// const { db } = require('./firebase');

// // Инициализация бота и переменных окружения
// const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
// const cryptoPayApiKey = process.env.CRYPTOPAY_API_KEY;

// // Обработка команды /start
// bot.start((ctx) => {
//   ctx.reply('Добро пожаловать! Используйте команду /pay для оплаты.');
//   // Отправка кнопки для открытия веб-приложения
//   ctx.telegram.sendMessage(ctx.chat.id, 'Откройте веб-приложение 4V.ROBOT:', {
//     reply_markup: {
//       inline_keyboard: [
//         [{ text: '🌐 4V.ROBOT', web_app: { url: 'https://forexgoodnews.com' } }]
//       ]
//     }
//   });
// });

// // Обработка команды /pay
// bot.command('pay', (ctx) => {
//   ctx.reply('Выберите валюту для оплаты:', Markup.inlineKeyboard([
//     Markup.button.callback('BTC', 'pay_btc'),
//     Markup.button.callback('USDT', 'pay_usdt'),
//     Markup.button.callback('TON', 'pay_ton')
//   ]));
// });

// // Функция для создания счета
// const createInvoice = async (ctx, asset) => {
//   let amount = 0.1; // Сумма эквивалентная 50 USDT для всех валют

//   try {
//     const response = await axios.post('https://pay.crypt.bot/api/createInvoice', {
//       asset,
//       amount,
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

// // Обработка нажатия кнопки оплаты
// bot.action('pay_btc', (ctx) => createInvoice(ctx, 'BTC'));
// bot.action('pay_usdt', (ctx) => createInvoice(ctx, 'USDT'));
// bot.action('pay_ton', (ctx) => createInvoice(ctx, 'TON'));

// // Проверка статуса оплаты
// const checkPaymentStatus = async (userId) => {
//   const userDoc = await db.collection('users').doc(userId.toString()).get();
//   return userDoc.exists && userDoc.data().hasPaid;
// };

// // Обработка команды использования сервиса
// bot.command('use_service', async (ctx) => {
//   const hasPaid = await checkPaymentStatus(ctx.from.id);
//   if (hasPaid) {
//     ctx.reply('Добро пожаловать! Вы можете использовать наш сервис.');
//   } else {
//     ctx.reply('Извините, вы должны оплатить доступ, используя команду /pay.');
//   }
// });

// // Запуск бота
// bot.launch();
// console.log('Бот запущен с использованием long polling...');

// // Создание Express-сервера для обработки webhook уведомлений
// const app = express();
// app.use(bodyParser.json());

// app.post('/webhook', async (req, res) => {
//   const update = req.body;

//   if (update && update.ok) {
//     const invoice = update.result;

//     if (invoice.status === 'paid') {
//       const userId = JSON.parse(invoice.payload).userId;
//       await db.collection('users').doc(userId.toString()).set({
//         hasPaid: true
//       }, { merge: true });
//     }
//   }

//   res.sendStatus(200);
// });

// // Настройка порта для прослушивания
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
const https = require('https');

// Инициализация бота и переменных окружения
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const cryptoPayApiKey = process.env.CRYPTOPAY_API_KEY;

// Обработка команды /start
bot.start((ctx) => {
  console.log('Команда /start вызвана');
  ctx.reply('Добро пожаловать! Используйте команду /pay для оплаты.')
    .then(() => {
      console.log('Сообщение отправлено успешно');
    })
    .catch((error) => {
      console.error('Ошибка при отправке сообщения:', error);
    });
  // Отправка кнопки для открытия веб-приложения
  ctx.telegram.sendMessage(ctx.chat.id, 'Откройте веб-приложение 4V.ROBOT:', {
    reply_markup: {
      inline_keyboard: [
        [{ text: '🌐 4V.ROBOT', web_app: { url: 'https://forexgoodnews.com/' } }]
      ]
    }
  }).then(() => {
    console.log('Кнопка отправлена успешно');
  }).catch((error) => {
    console.error('Ошибка при отправке кнопки:', error);
  });
});

// Обработка команды /pay
bot.command('pay', (ctx) => {
  console.log('Команда /pay вызвана');
  ctx.reply('Выберите валюту для оплаты:', Markup.inlineKeyboard([
    Markup.button.callback('BTC', 'pay_btc'),
    Markup.button.callback('USDT', 'pay_usdt'),
    Markup.button.callback('TON', 'pay_ton')
  ])).then(() => {
    console.log('Сообщение отправлено успешно');
  }).catch((error) => {
    console.error('Ошибка при отправке сообщения:', error);
  });
});

// Функция для создания счета
const createInvoice = async (ctx, asset) => {
  let amount = 0.1; // Сумма эквивалентная 50 USDT для всех валют

  try {
    console.log('Создание счета для:', asset);
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
      console.log('Счет создан:', invoiceUrl);
      ctx.reply(`Пожалуйста, совершите оплату по следующей ссылке: ${invoiceUrl}`).then(() => {
        console.log('Ссылка на счет отправлена успешно');
      }).catch((error) => {
        console.error('Ошибка при отправке сообщения:', error);
      });
    } else {
      console.error('Ошибка API:', response.data);
      ctx.reply('Извините, произошла ошибка при создании платежа.').then(() => {
        console.log('Сообщение об ошибке отправлено успешно');
      }).catch((error) => {
        console.error('Ошибка при отправке сообщения:', error);
      });
    }
  } catch (error) {
    if (error.response) {
      console.error('Ошибка при создании счета:', error.response.data);
      ctx.reply('Извините, произошла ошибка при создании платежа.').then(() => {
        console.log('Сообщение об ошибке отправлено успешно');
      }).catch((error) => {
        console.error('Ошибка при отправке сообщения:', error);
      });
    } else if (error.request) {
      console.error('Ошибка запроса:', error.request);
      ctx.reply('Извините, произошла ошибка при создании платежа.').then(() => {
        console.log('Сообщение об ошибке отправлено успешно');
      }).catch((error) => {
        console.error('Ошибка при отправке сообщения:', error);
      });
    } else {
      console.error('Ошибка:', error.message);
      ctx.reply('Извините, произошла ошибка при создании платежа.').then(() => {
        console.log('Сообщение об ошибке отправлено успешно');
      }).catch((error) => {
        console.error('Ошибка при отправке сообщения:', error);
      });
    }
  }
};

// Обработка нажатия кнопки оплаты
bot.action('pay_btc', (ctx) => createInvoice(ctx, 'BTC'));
bot.action('pay_usdt', (ctx) => createInvoice(ctx, 'USDT'));
bot.action('pay_ton', (ctx) => createInvoice(ctx, 'TON'));

// Проверка статуса оплаты
const checkPaymentStatus = async (userId) => {
  try {
    const userDoc = await db.collection('users').doc(userId.toString()).get();
    return userDoc.exists && userDoc.data().hasPaid;
  } catch (error) {
    console.error('Ошибка при проверке статуса оплаты:', error);
    return false;
  }
};

// Обработка команды использования сервиса
bot.command('use_service', async (ctx) => {
  const hasPaid = await checkPaymentStatus(ctx.from.id);
  if (hasPaid) {
    ctx.reply('Добро пожаловать! Вы можете использовать наш сервис.').then(() => {
      console.log('Сообщение об использовании сервиса отправлено успешно');
    }).catch((error) => {
      console.error('Ошибка при отправке сообщения:', error);
    });
  } else {
    ctx.reply('Извините, вы должны оплатить доступ, используя команду /pay.').then(() => {
      console.log('Сообщение об оплате отправлено успешно');
    }).catch((error) => {
      console.error('Ошибка при отправке сообщения:', error);
    });
  }
});

// Запуск бота
bot.launch().then(() => {
  console.log('Бот запущен с использованием long polling...');
}).catch((error) => {
  console.error('Ошибка при запуске бота:', error);
});

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

// Настройка порта для прослушивания
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

// Периодические запросы для поддержания активности сервера
const keepAlive = () => {
  https.get('https://fourvrobot.onrender.com', (resp) => {
    resp.on('data', () => {
      console.log('Keeping the instance alive');
    });
  }).on('error', (err) => {
    console.log('Error: ' + err.message);
  });
};

setInterval(keepAlive, 5 * 60 * 1000); // Каждые 5 минут
