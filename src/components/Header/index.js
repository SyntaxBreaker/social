import React, {useContext} from 'react';
import {signInWithGoogle} from "../../firebase/firebase";
import {UserContext} from "../../providers/UserProvider";
import './index.scss';

function Header() {
    const user = useContext(UserContext);

    return (
        <header>
            <a href="/"><img src="" alt="logo" /></a>
            <input type="text" placeholder="Search on ..." />
            {!user ? <button onClick={signInWithGoogle}>Log in</button> : <button>Tweet</button>}
        </header>
    )
}

export default Header;