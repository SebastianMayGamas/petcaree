import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import  {getFirestore} from 'firebase/firestore';
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {v4} from 'uuid'
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
const db = getFirestore(app)
const auth = getAuth(app);
export const storage = getStorage(app);
export { auth };
export  {db};

export function uploadfile(file) {
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, v4());
        uploadBytes(storageRef, file)
            .then(snapshot => {
                console.log('Uploaded a blob or file!', snapshot);
                return getDownloadURL(snapshot.ref);
            })
            .then(downloadURL => {
                resolve(downloadURL);
            })
            .catch(error => {
                console.error('Error uploading file:', error);
                reject(error);
            });
    });
}
