import { initializeApp } from 'firebase/app';
import { collection, getFirestore, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';
import { categoriesData } from './categoriesData';

const config = {
    apiKey: "AIzaSyB_psG_2HT8VisbjB3szsMjZsnlfQIS9ko",
    authDomain: "what-to-buy-94750.firebaseapp.com",
    databaseURL: "https://what-to-buy-94750.firebaseio.com",
    projectId: "what-to-buy-94750",
    storageBucket: "what-to-buy-94750.appspot.com",
    messagingSenderId: "194092546135",
    appId: "1:194092546135:web:7661e65a00a7f2aa390b12",
    measurementId: "G-XWZR1H0ZMY"
}

const collectionName = 'categories';
const app = initializeApp(config);
const db = getFirestore();
const colRef = collection(db, collectionName);
let docRef, docs;

async function getCategories() {
    const snapshot = await getDocs(colRef);
    docs = snapshot.docs[0].data();
    const docID  = snapshot.docs[0].id;
    docRef = doc(db, collectionName, docID);
    return docs;
}

function reverseProductState({category, product, isToBuy, getData}) {
    const reversedIsToBuy = parseInt(isToBuy) === 0 ? 1 : 0;
    const pathToValue = `${category}.products.${product}`;
    const update = {
        [pathToValue]: reversedIsToBuy
    }
    updateDoc(docRef, update).then(() => {
        getData();
    });
}

async function resetCategories() {
    addDoc(colRef, {
        ...categoriesData
    });
}

export { app, db, getCategories, reverseProductState, resetCategories };