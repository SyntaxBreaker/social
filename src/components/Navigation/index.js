import React, { useContext, useRef, useEffect } from 'react';
import { UserContext } from "../../providers/UserProvider";
import { signInWithGoogle, signOut } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import './index.scss';
import * as Icon from 'react-feather';

function Navigation({ isMobile, setIsOpen }) {
    const user = useContext(UserContext);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleOutsideClick(event) {
            if (isMobile && menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        }
    }, [])

    return (
        <div className="navigation">
            <ul className="navigation__list" ref={menuRef} onClick={() => isMobile && setIsOpen(false)}>
                {user ?
                    <>
                        <li className="navigation__item">
                            <Link to="/" className="navigation__link"><Icon.Home /> Home</Link>
                        </li>
                        <li className="navigation__item">
                            <Link to={`/profile/${user.uid}`} className="navigation__link"><Icon.User /> Profile</Link>
                        </li>
                        <li className="navigation__item">
                            <Link to={`/settings`} className="navigation__link"><Icon.Settings /> Settings</Link>
                        </li>
                        <li className="navigation__item">
                            <button onClick={signOut} className="navigation__btn"><Icon.LogOut /> Log out</button>
                        </li>
                    </>
                    : <li className="navigation__item">
                        <button onClick={signInWithGoogle} className="navigation__btn"><Icon.LogIn /> Log in</button>
                    </li>}
            </ul>
        </div>
    )
}

export default Navigation;