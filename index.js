
// require("dotenv").config();
// const { Telegraf, Markup } = require("telegraf");
// const axios = require("axios");
// const express = require("express");
// const bodyParser = require("body-parser");
// const { db } = require("./firebase");

// // Инициализация бота с использованием переменных окружения
// const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// // Обработка команды /start с реферальной системой
// bot.start((ctx) => {
//   const userId = ctx.from.id; // Получаем ID пользователя, вызвавшего команду /start
//   console.log(`ID пользователя, вызвавшего команду /start: ${userId}`);

//   const messageText = ctx.message.text || ""; // Проверяем, есть ли текст
//   const startParam = messageText.split(" ")[1]; // Получаем параметр после /start

//   // Если есть параметр "start", то это реферальная ссылка
//   if (startParam && startParam.includes("owner_")) {
//     const ownerId = startParam.split("_")[1]; // Извлекаем ID пригласившего
//     console.log(`ID пригласившего: ${ownerId}`);

//     // Проверка, не совпадают ли ID пригласившего и пользователя
//     if (ownerId === userId.toString()) {
//       ctx.reply("Вы не можете использовать свою собственную реферальную ссылку.");
//       return;
//     }

//     // Отправляем POST-запрос на сервер для создания реферальной записи
//     const url = `https://4v-news-api.azurewebsites.net/Games4V/Referral/Create?TelegramUserId=${ownerId}&TelegramChildUserId=${userId}`;
//     console.log(`Отправляем запрос на сервер: ${url}`);

//     axios
//       .post(url)
//       .then((response) => {
//         console.log("Успешный ответ сервера:", response.data);
//         ctx.reply("Вы успешно зарегистрированы как реферал!");
//       })
//       .catch((error) => {
//         console.error(
//           "Ошибка при создании реферальной записи:",
//           error.response ? error.response.data : error.message
//         );
//         ctx.reply("Произошла ошибка при регистрации реферала.");
//       });
//   } else {
//     console.log(
//       "Параметр start отсутствует, генерируем реферальную ссылку для текущего пользователя."
//     );
//   }

//   // Генерация реферальной ссылки
//   const referralLink = `https://t.me/FOUR_V_DOT_ROBOT_bot?start=owner_${userId}`;
//   console.log(`Сгенерирована реферальная ссылка: ${referralLink}`);

//   // Отправляем пользователю сообщение с кнопками для перехода на веб-приложение и приглашения друзей
//   ctx.telegram
//     .sendMessage(ctx.chat.id, "<b>WELLCOME TO GAME</b>", {
//       parse_mode: "HTML",
//       reply_markup: {
//         inline_keyboard: [
//           [
//             { text: "Реферальная ссылка", callback_data: "copy_referral_link" },
//           ],
//           [
//             {
//               text: "Пригласить друзей",
//               switch_inline_query: referralLink, // Оставляем только ссылку, убираем упоминание бота
//             },
//           ],
//           [
//             {
//               text: "Начать майнинг",
//               web_app: { url: "https://test4vcoin.web.app" }, // Добавляем кнопку для открытия веб-приложения
//             },
//           ],
//         ],
//       },
//     })
//     .catch((err) => {
//       console.error("Ошибка при отправке сообщения:", err);
//     });
// });

// // Обработка команды для копирования реферальной ссылки
// bot.action("copy_referral_link", (ctx) => {
//   const referralLink = `https://t.me/FOUR_V_DOT_ROBOT_bot?start=owner_${ctx.from.id}`;

//   // Отправляем только реферальную ссылку пользователю, без лишнего упоминания бота
//   ctx.reply(`<b>Реферальная ссылка:</b> <code>${referralLink}</code>`, { parse_mode: "HTML" });
//   ctx.answerCbQuery("Ссылка отправлена в чат!");
//   console.log(`Ссылка для копирования: ${referralLink}`);
// });

// bot.launch();
// console.log("Бот запущен с использованием long polling...");

// // Создание Express-сервера для обработки webhook уведомлений от платежей
// const app = express();
// app.use(bodyParser.json());

// // app.post("/webhook", async (req, res) => {
// //   const update = req.body;

// //   if (update && update.ok) {
// //     const invoice = update.result;

// //     if (invoice.status === "paid") {
// //       const userId = JSON.parse(invoice.payload).userId; // Получаем ID пользователя из инвойса
// //       await db.collection("users").doc(userId.toString()).set(
// //         {
// //           hasPaid: true, // Обновляем статус оплаты в базе данных
// //         },
// //         { merge: true }
// //       );
// //     }
// //   }

// //   res.sendStatus(200); // Возвращаем статус успешной обработки
// // });

// // Настройка порта для прослушивания запросов
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Сервер запущен на порту ${PORT}`);
// });
// require("dotenv").config();
// const { Telegraf, Markup } = require("telegraf");
// const axios = require("axios");
// const express = require("express");
// const bodyParser = require("body-parser");
// const { db } = require("./firebase");

// // Инициализация бота с использованием переменных окружения
// const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// // Настройка Web App в меню чата через метод setChatMenuButton
// const setupWebAppMenuButton = async () => {
//   const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/setChatMenuButton`;

//   const body = {
//     "menu_button": {
//       "type": "web_app",
//       "text": "Открыть Web App",
//       "web_app": {
//         "url": "https://test4vcoin.web.app" // Укажите ваш URL Web App
//       }
//     }
//   };

//   try {
//     const response = await axios.post(url, body);
//     console.log('Web App в меню бота успешно настроен:', response.data);
//   } catch (error) {
//     console.error('Ошибка при настройке Web App в меню бота:', error.response ? error.response.data : error.message);
//   }
// };

// // Запускаем настройку Web App в меню при старте бота
// setupWebAppMenuButton();

// // Обработка команды /start с реферальной системой
// bot.start((ctx) => {
//   const userId = ctx.from.id; // Получаем ID пользователя, вызвавшего команду /start
//   console.log(`ID пользователя, вызвавшего команду /start: ${userId}`);

//   const messageText = ctx.message.text || ""; // Проверяем, есть ли текст
//   const startParam = messageText.split(" ")[1]; // Получаем параметр после /start

//   // Если есть параметр "start", то это реферальная ссылка
//   if (startParam && startParam.includes("owner_")) {
//     const ownerId = startParam.split("_")[1]; // Извлекаем ID пригласившего
//     console.log(`ID пригласившего: ${ownerId}`);

//     // Проверка, не совпадают ли ID пригласившего и пользователя
//     if (ownerId === userId.toString()) {
//       ctx.reply("Вы не можете использовать свою собственную реферальную ссылку.");
//       return;
//     }

//     // Отправляем POST-запрос на сервер для создания реферальной записи
//     const url = `https://4v-news-api.azurewebsites.net/Games4V/Referral/Create?TelegramUserId=${ownerId}&TelegramChildUserId=${userId}`;
//     console.log(`Отправляем запрос на сервер: ${url}`);

//     axios
//       .post(url)
//       .then((response) => {
//         console.log("Успешный ответ сервера:", response.data);
//         ctx.reply("Вы успешно зарегистрированы как реферал!");
//       })
//       .catch((error) => {
//         console.error(
//           "Ошибка при создании реферальной записи:",
//           error.response ? error.response.data : error.message
//         );
//         ctx.reply("Произошла ошибка при регистрации реферала.");
//       });
//   } else {
//     console.log(
//       "Параметр start отсутствует, генерируем реферальную ссылку для текущего пользователя."
//     );
//   }

//   // Генерация реферальной ссылки
//   const referralLink = `https://t.me/FOUR_V_DOT_ROBOT_bot?start=owner_${userId}`;
//   console.log(`Сгенерирована реферальная ссылка: ${referralLink}`);

//   // Отправляем пользователю сообщение с кнопками для перехода на веб-приложение и приглашения друзей
//   ctx.telegram
//     .sendMessage(ctx.chat.id, "<b>WELLCOME TO GAME</b>", {
//       parse_mode: "HTML",
//       reply_markup: {
//         inline_keyboard: [
//           [
//             { text: "Реферальная ссылка", callback_data: "copy_referral_link" },
//           ],
//           [
//             {
//               text: "Пригласить друзей",
//               switch_inline_query: referralLink, // Оставляем только ссылку, убираем упоминание бота
//             },
//           ],
//           [
//             {
//               text: "Начать майнинг",
//               web_app: { url: "https://test4vcoin.web.app" }, // Добавляем кнопку для открытия веб-приложения
//             },
//           ],
//         ],
//       },
//     })
//     .catch((err) => {
//       console.error("Ошибка при отправке сообщения:", err);
//     });
// });

// // Обработка команды для копирования реферальной ссылки
// bot.action("copy_referral_link", (ctx) => {
//   const referralLink = `https://t.me/FOUR_V_DOT_ROBOT_bot?start=owner_${ctx.from.id}`;

//   // Отправляем только реферальную ссылку пользователю, без лишнего упоминания бота
//   ctx.reply(`<b>Реферальная ссылка:</b> <code>${referralLink}</code>`, { parse_mode: "HTML" });
//   ctx.answerCbQuery("Ссылка отправлена в чат!");
//   console.log(`Ссылка для копирования: ${referralLink}`);
// });

// bot.launch();
// console.log("Бот запущен с использованием long polling...");

// // Создание Express-сервера для обработки webhook уведомлений от платежей
// const app = express();
// app.use(bodyParser.json());

// // app.post("/webhook", async (req, res) => {
// //   const update = req.body;

// //   if (update && update.ok) {
// //     const invoice = update.result;

// //     if (invoice.status === "paid") {
// //       const userId = JSON.parse(invoice.payload).userId; // Получаем ID пользователя из инвойса
// //       await db.collection("users").doc(userId.toString()).set(
// //         {
// //           hasPaid: true, // Обновляем статус оплаты в базе данных
// //         },
// //         { merge: true }
// //       );
// //     }
// //   }

// //   res.sendStatus(200); // Возвращаем статус успешной обработки
// // });

// // Настройка порта для прослушивания запросов
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Сервер запущен на порту ${PORT}`);
// });
require("dotenv").config();
const { Telegraf, Markup } = require("telegraf");
const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");
const { db } = require("./firebase");

// Инициализация бота с использованием переменных окружения
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Настройка Web App в меню чата через метод setChatMenuButton
const setupWebAppMenuButton = async () => {
  const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/setChatMenuButton`;

  const body = {
    "menu_button": {
      "type": "web_app",
      "text": "Открыть Web App",
      "web_app": {
        "url": "https://test4vcoin.web.app" // Укажите ваш URL Web App
      }
    }
  };

  try {
    const response = await axios.post(url, body);
    console.log('Web App в меню бота успешно настроен:', response.data);
  } catch (error) {
    console.error('Ошибка при настройке Web App в меню бота:', error.response ? error.response.data : error.message);
  }
};

// Запускаем настройку Web App в меню при старте бота
setupWebAppMenuButton();

// Обработка команды /start с реферальной системой и автоматическим открытием Web App
bot.start((ctx) => {
  const userId = ctx.from.id; // Получаем ID пользователя, вызвавшего команду /start
  console.log(`ID пользователя, вызвавшего команду /start: ${userId}`);

  const messageText = ctx.message.text || ""; // Проверяем, есть ли текст
  const startParam = messageText.split(" ")[1]; // Получаем параметр после /start

  // Если есть параметр "start", то это реферальная ссылка
  if (startParam && startParam.includes("owner_")) {
    const ownerId = startParam.split("_")[1]; // Извлекаем ID пригласившего
    console.log(`ID пригласившего: ${ownerId}`);

    // Проверка, не совпадают ли ID пригласившего и пользователя
    if (ownerId === userId.toString()) {
      ctx.reply("Вы не можете использовать свою собственную реферальную ссылку.");
      return;
    }

    // Отправляем POST-запрос на сервер для создания реферальной записи
    const url = `https://4v-news-api.azurewebsites.net/Games4V/Referral/Create?TelegramUserId=${ownerId}&TelegramChildUserId=${userId}`;
    console.log(`Отправляем запрос на сервер: ${url}`);

    axios
      .post(url)
      .then((response) => {
        console.log("Успешный ответ сервера:", response.data);
        ctx.reply("Вы успешно зарегистрированы как реферал!");
      })
      .catch((error) => {
        console.error(
          "Ошибка при создании реферальной записи:",
          error.response ? error.response.data : error.message
        );
        ctx.reply("Произошла ошибка при регистрации реферала.");
      });

    // Автоматически открываем Web App с реферальными параметрами
    ctx.telegram.sendMessage(ctx.chat.id, "Открываем приложение...", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Открыть приложение",
              web_app: { url: `https://test4vcoin.web.app?ref=${ownerId}&userId=${userId}` } // Открываем Web App с параметрами
            }
          ]
        ],
      },
    });

  } else {
    console.log(
      "Параметр start отсутствует, генерируем реферальную ссылку для текущего пользователя."
    );
  }

  // Генерация реферальной ссылки
  const referralLink = `https://t.me/FOUR_V_DOT_ROBOT_bot?start=owner_${userId}`;
  console.log(`Сгенерирована реферальная ссылка: ${referralLink}`);

  // Отправляем пользователю сообщение с кнопками для перехода на веб-приложение и приглашения друзей
  ctx.telegram
    .sendMessage(ctx.chat.id, "<b>WELLCOME TO GAME</b>", {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Реферальная ссылка", callback_data: "copy_referral_link" },
          ],
          [
            {
              text: "Пригласить друзей",
              switch_inline_query: referralLink, // Оставляем только ссылку, убираем упоминание бота
            },
          ],
          [
            {
              text: "Начать майнинг",
              web_app: { url: "https://test4vcoin.web.app" }, // Добавляем кнопку для открытия веб-приложения
            },
          ],
        ],
      },
    })
    .catch((err) => {
      console.error("Ошибка при отправке сообщения:", err);
    });
});

// Обработка команды для копирования реферальной ссылки
bot.action("copy_referral_link", (ctx) => {
  const referralLink = `https://t.me/FOUR_V_DOT_ROBOT_bot?start=owner_${ctx.from.id}`;

  // Отправляем только реферальную ссылку пользователю, без лишнего упоминания бота
  ctx.reply(`<b>Реферальная ссылка:</b> <code>${referralLink}</code>`, { parse_mode: "HTML" });
  ctx.answerCbQuery("Ссылка отправлена в чат!");
  console.log(`Ссылка для копирования: ${referralLink}`);
});

bot.launch();
console.log("Бот запущен с использованием long polling...");

// Создание Express-сервера для обработки webhook уведомлений от платежей
const app = express();
app.use(bodyParser.json());



// Настройка порта для прослушивания запросов
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
