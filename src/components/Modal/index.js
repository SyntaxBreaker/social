import React, {useContext} from 'react';
import {signInWithGoogle} from "../../firebase/firebase";
import {UserContext} from "../../providers/UserProvider";
import './index.scss';

function Modal({handleClose}) {
    const user = useContext(UserContext);

    const login = () => {
        signInWithGoogle();
        if(user) {
            handleClose()
        }
    }

    return (
        <div className="modal">
            <h2>Hello, Friend!</h2>
            <p>Please log in!</p>
            <div>
                <button onClick={login}>Log in with google!</button>
                <button onClick={handleClose}>Close</button>
            </div>
        </div>
    )
}

export default Modal;