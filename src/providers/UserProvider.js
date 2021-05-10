import React, {useState, useEffect} from 'react';
import {auth} from '../firebase/firebase';
import {db} from '../firebase/firebase';

export const UserContext = React.createContext(null);

export default function UserProvider({children}) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged(async user => {
            if(user) {
                const { displayName, photoURL, uid } = user;
                setUser({
                    displayName,
                    photoURL,
                    uid
                })

                db.collection('users').doc(uid).get()
                    .then((docSnapshot) => {
                        if(!docSnapshot.exists) {
                            db.collection("users").doc(uid).set({
                                uid: uid,
                                displayName: displayName,
                                avatar: photoURL,
                                city: null,
                                website: null
                            })
                        }
                    })
            } else {
                setUser(null);
            }
        })
    }, []);

    return (<UserContext.Provider value={user}>
        {children}
    </UserContext.Provider>)
}