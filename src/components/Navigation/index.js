import React, {useContext} from 'react';
import {UserContext} from "../../providers/UserProvider";
import {signOut} from "../../firebase/firebase";
import {Link} from "react-router-dom";
import './index.scss';
import * as Icon from 'react-feather';

function Navigation() {
    const user = useContext(UserContext);

    return (
        <div className="navigation">
            <ul>
                <li>
                    <Link to="/"><Icon.Home /> Home</Link>
                </li>
                {user &&
                    <>
                        <li>
                            <Link to={`/profile/${user.uid}`}><Icon.User /> Profile</Link>
                        </li>
                        <li>
                            <button onClick={signOut}><Icon.LogOut/> Log out</button>
                        </li>
                    </>
                }
            </ul>
        </div>
    )
}

export default Navigation;