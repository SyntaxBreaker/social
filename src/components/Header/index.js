import React, { useContext, useState, useEffect } from 'react';
import { signInWithGoogle, signOut } from "../../firebase/firebase";
import { UserContext } from "../../providers/UserProvider";
import logo from '../../logo.svg';
import './index.scss';
import Navigation from '../Navigation/index';

function Header() {
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const user = useContext(UserContext);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth <= 900) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        }

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    useEffect(() => {
        if (isMobile && isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "initial";
        }
    }, [isMobile, isOpen]);

    return (
        <header className="header">
            <a href="/" className="header__logo"><img src={logo} className="header__img" alt='Website logo' /> Social</a>
            {isMobile ? <button onClick={() => setIsOpen(!isOpen)} className="header__button--menu">☰</button> : !user ? <button className="header__button" onClick={signInWithGoogle}>Log in</button> : <button className="header__button" onClick={signOut}>Log out</button>}
            {(isOpen && isMobile) && <Navigation isMobile={isMobile} setIsOpen={setIsOpen} />}
        </header>
    )
}

export default Header;