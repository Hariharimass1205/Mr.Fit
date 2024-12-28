
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA4AUV5n9EJHA_LfbDW3ZJcTZ8igghIkGI",
    authDomain: "mr-fit-696b2.firebaseapp.com",
    projectId: "mr-fit-696b2",
    storageBucket: "mr-fit-696b2.firebasestorage.app",
    messagingSenderId: "330416788935",
    appId: "1:330416788935:web:12577d65c5a67b1c7e75e2",
    measurementId: "G-3EHVDWFYTC"
};


export const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth