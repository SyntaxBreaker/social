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
            <h2 className="modal__heading">Hello, Friend!</h2>
            <p className="modal__description">Please log in!</p>
            <div class="modal__body">
                <button onClick={login} className="modal__btn">Log in with google!</button>
                <button onClick={handleClose} className="modal__btn">Close</button>
            </div>
        </div>
    )
}

export default Modal;