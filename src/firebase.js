import { initializeApp } from "firebase/app"; // Inicializa la aplicación Firebase con la configuración proporcionada.
import { getAuth } from 'firebase/auth'; // Obtiene el objeto de autenticación de Firebase
import { getFirestore } from 'firebase/firestore'; // Importa getFirestore para obtener una referencia a la base de datos Firestore de Firebase.

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDddEQSWVlEG8xTNO8hmz50gYTRHCrHDU",
  authDomain: "programacion-c1ee0.firebaseapp.com",
  projectId: "programacion-c1ee0",
  storageBucket: "programacion-c1ee0.appspot.com",
  messagingSenderId: "639452601188",
  appId: "1:639452601188:web:f0bcceef3dcdd361833871",
  measurementId: "G-MBLXC0JWTR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app); // Obtiene una referencia a Firebase Firestore
