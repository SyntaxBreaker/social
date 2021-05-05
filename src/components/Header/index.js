import React, {useContext} from 'react';
import {signInWithGoogle} from "../../firebase/firebase";
import {UserContext} from "../../providers/UserProvider";

function Header() {
    const user = useContext(UserContext);

    return (
        <div>
            <img src="" alt="logo" />
            <input type="text" />
            {!user ? <button onClick={signInWithGoogle}>Log in</button> : <button>Tweet</button>}
        </div>
    )
}

export default Header;