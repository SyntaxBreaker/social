import React, {useContext} from 'react';
import {signInWithGoogle} from "../../firebase/firebase";
import {UserContext} from "../../providers/UserProvider";

function Modal({handleClose}) {
    const user = useContext(UserContext);

    const login = () => {
        signInWithGoogle();
        if(user) {
            handleClose()
        }
    }

    return (
        <div>
            <h2>Hello, Friend!</h2>
            <p>Please log in!</p>
            <button onClick={login}>Log in with google!</button>
            <button onClick={handleClose}>Close</button>
        </div>
    )
}

export default Modal;