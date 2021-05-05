import React, {useContext} from 'react';
import {UserContext} from "../../providers/UserProvider";
import {signOut} from "../../firebase/firebase";
import {Link} from "react-router-dom";
import './index.scss';

function Navigation() {
    const user = useContext(UserContext);

    return (
        <div className="navigation">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {user &&
                    <>
                        <li>
                            <Link to={`/profile/${user.uid}`}>Profile</Link>
                        </li>
                        <li>
                            <button onClick={signOut}>Log out</button>
                        </li>
                    </>
                }
            </ul>
        </div>
    )
}

export default Navigation;