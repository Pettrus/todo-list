import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, remove as removeFirebaseValue, onValue, onChildRemoved } from "firebase/database";
import { useState, useEffect } from 'react';

const firebaseConfig = {
    apiKey: "AIzaSyAVw1yV_yQdfsgX6K1Ybr0bVvfsMdxcvLQ",
    authDomain: "planless-2d062.firebaseapp.com",
    databaseURL: "https://planless-2d062-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "planless-2d062",
    storageBucket: "planless-2d062.appspot.com",
    messagingSenderId: "178008591722",
    appId: "1:178008591722:web:738ee49834c9e61abb6913"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const useFirebase = (collection: string) => {
    const [collectionData, setCollectionData] = useState<any>();

    const save = (data: unknown) => {
        push(ref(db, collection), data);
    }

    const remove = (idsToRemove: string[]) => {
        idsToRemove.forEach((id: string) => removeFirebaseValue(ref(db, `${collection}/${id}`)));
    }

    useEffect(() => {
        if (collection != null) {
            onValue(ref(db, collection), (snapshot) => {
                setCollectionData(snapshot.val());
            });

            onChildRemoved(ref(db, collection), (snapshot) => {
                setCollectionData(snapshot.val());
            });
        }
    }, [])

    return { save, remove, collectionData };
}