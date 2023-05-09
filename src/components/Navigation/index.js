import React, { useContext } from 'react';
import { UserContext } from "../../providers/UserProvider";
import { signOut } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import './index.scss';
import * as Icon from 'react-feather';

function Navigation() {
    const user = useContext(UserContext);

    return (
        <div className="navigation">
            <ul className="navigation__list">
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
            </ul>
        </div>
    )
}

export default Navigation;