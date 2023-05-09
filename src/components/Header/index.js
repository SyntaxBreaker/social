import React, {useContext} from 'react';
import {signInWithGoogle, signOut} from "../../firebase/firebase";
import {UserContext} from "../../providers/UserProvider";
import logo from '../../logo.svg';
import './index.scss';

function Header() {
    const user = useContext(UserContext);

    return (
        <header className="header">
            <a href="/" className="header__logo"><img src={logo} className="header__img" alt='Website logo' /> Social</a>
            {!user ? <button className="header__button" onClick={signInWithGoogle}>Log in</button> : <button className="header__button" onClick={signOut}>Log out</button>}
        </header>
    )
}

export default Header;