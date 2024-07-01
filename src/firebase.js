// Importa las funciones necesarias de los SDKs que necesitas
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAE1k0BgBHd6PLzHu864sEh1YqXSguE__g",
  authDomain: "prueba-ee559.firebaseapp.com",
  projectId: "prueba-ee559",
  storageBucket: "prueba-ee559.appspot.com",
  messagingSenderId: "356782906910",
  appId: "1:356782906910:web:53848df481b1b7f35d180f"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);

export { db };
