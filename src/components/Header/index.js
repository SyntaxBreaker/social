import React, {useContext} from 'react';
import {signInWithGoogle, signOut} from "../../firebase/firebase";
import {UserContext} from "../../providers/UserProvider";

function Header() {
    const user = useContext(UserContext);

    return (
        <header>
            {user ?
                <button onClick={() => signOut()}>Log out!</button> :
                <button onClick={() => signInWithGoogle()}>Log in!</button>
            }
        </header>
    )
}

export default Header;