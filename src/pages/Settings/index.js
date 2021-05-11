import React, {useState, useEffect, useContext} from 'react';
import {db} from '../../firebase/firebase';
import {UserContext} from "../../providers/UserProvider";
import './index.scss';

function Settings() {
    const user = useContext(UserContext);
    const [profileInformation, setProfileInformation] = useState(null);

    useEffect(() => {
        async function fetchProfileInformation() {
            await db.collection("users").doc(user.uid).onSnapshot(doc => {
                setProfileInformation(doc.data());
            })
        }

        fetchProfileInformation();
    }, []);

    const onChange = event => {
        const {name, value} = event.target;

        setProfileInformation(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const onSubmit = event => {
        event.preventDefault();
        db.collection('users').doc(user.uid).set(profileInformation)
    }

    return (
        <div className="settings">
            {profileInformation && <form onSubmit={event => onSubmit(event)}>
                <label>City:</label>
                <input type="text" name="city" value={profileInformation.city} onChange={event => onChange(event)} />
                <label>Website (Type only the domain)</label>
                <input type="text" name="website" value={profileInformation.website} onChange={event => onChange(event)} />
                <button>Submit</button>
            </form>}
        </div>
    )
}

export default Settings;