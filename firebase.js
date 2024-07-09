const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { getAuth } = require("firebase/auth");

// Ваша конфигурация Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAgtRjfG_x6Lm1R0wUkSftXnP-HT6KWrYE",
  authDomain: "vcoin-aa0de.firebaseapp.com",
  projectId: "vcoin-aa0de",
  storageBucket: "vcoin-aa0de.appspot.com",
  messagingSenderId: "45449257950",
  appId: "1:45449257950:web:0058c2401ca8624476734f",
  measurementId: "G-8Z0N136P2V"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Экспорт `auth` и `db` для использования в других файлах
module.exports = { auth, db };
