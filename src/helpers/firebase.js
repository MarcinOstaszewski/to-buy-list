import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, doc, onSnapshot, updateDoc, addDoc } from 'firebase/firestore';
import { categoriesArray } from './categoriesArray';
import config from './firebaseConfig';

const collectionName = 'categories';
const app = initializeApp(config);
const db = getFirestore();
const colRef = collection(db, collectionName);
const docRefs = {};
const unsubscriptions = {}; 

const getCategories = async (onSnapshotChange) => {
    const snapshot = await getDocs(colRef);
    const collectionArray = [];

    snapshot.docs.forEach(document => {
        const docRef = doc(db, collectionName, document.id);
        const categoryName = document.data().name;
        docRefs[categoryName] = docRef;
        unsubscriptions[categoryName] = onSnapshot(docRef, docsSnap => {
            onSnapshotChange(docsSnap);
        });
        collectionArray.push(document.data());
    });
    return collectionArray;
}

const reverseProductState = ({category, product, isToBuy}) => { //, getData
    const reversedIsToBuy = parseInt(isToBuy) === 0 ? 1 : 0;
    const pathToValue = `products.${product}`;
    const update = {
        [pathToValue]: reversedIsToBuy
    }
    updateDoc(docRefs[category], update)
    // .then(() => {
    //     getData();
    // });
}

const resetCategoriesArray = async () => {
    categoriesArray.forEach(category => {
        addDoc(colRef, {
            ...category
        });
    });        
}

const queryCategories = async (e) => {
    const {path, queryText} =  e.target.dataset;
    const q = query(collection(db, "categories"), where(path, "==", queryText));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
}

export { 
    app,
    db,
    getCategories,
    reverseProductState,
    resetCategoriesArray,
    queryCategories
};
