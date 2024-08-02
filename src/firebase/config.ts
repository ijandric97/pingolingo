// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { ref as databaseRef, getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig =
  location.hostname === 'localhost'
    ? {
        databaseURL: '',
      }
    : {
        apiKey: import.meta.env.FIREBASE_API_KEY,
        authDomain: import.meta.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: import.meta.env.FIREBASE_DATABASE_URL,
        projectId: import.meta.env.FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.FIREBASE_APP_ID,
      }

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseDatabase = databaseRef(getDatabase())
export const firebaseStorage = getStorage()
