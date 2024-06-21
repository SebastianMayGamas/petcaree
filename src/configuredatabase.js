import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
        apiKey: "AIzaSyB2iCArZOp-GMX1GCxh5MQwEQawfKwepQw",
        authDomain: "petcare-b08a0.firebaseapp.com",
        projectId: "petcare-b08a0",
        storageBucket: "petcare-b08a0.appspot.com",
        messagingSenderId: "797468400543",
        appId: "1:797468400543:web:ce5e7589a66be17974fbaa",
        measurementId: "G-F5LMF0P8RP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
