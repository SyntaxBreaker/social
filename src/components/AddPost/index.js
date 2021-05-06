import React, {useContext, useState} from "react";
import {UserContext} from "../../providers/UserProvider";
import firebase from "firebase";
import {db} from "../../firebase/firebase";
import './index.scss';
import Modal from "../Modal";

function AddPost() {
    const user = useContext(UserContext);
    const [newPostContent, setNewPostContent] = useState('');
    const [newPostTags, setNewPostTags] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const onChange = event => {
        const tags = event.target.value.split(' ').filter(item => item.includes('#'));
        setNewPostTags(tags);
        setNewPostContent(event.target.value);
    }

    const onSubmit = async event => {
        event.preventDefault();

        const post = {
            author: user.displayName,
            authorId: user.uid,
            avatar: user.photoURL,
            postContent: newPostContent,
            tags: newPostTags,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            comments: [],
            likes: [],
            shares: [],
        }

        await db.collection('posts').add(post)

        setNewPostContent('');
        setNewPostTags('');
    }

    const toggleModal = (event) => {
        event.preventDefault();
        setShowModal(true);
    }

    const handleClose = () => {
        setShowModal(false);
    }

    return (
       <>
           {user ? <form onSubmit={event => onSubmit(event)}>
               <input type="text" name="newPost" value={newPostContent} placeholder={`What's happening?`} onChange={(event) => onChange((event))} />
           </form> : <form onSubmit={(event) => toggleModal(event)}>
               <input type="text" name="newPost" value={newPostContent} placeholder={`What's happening?`} onChange={(event) => onChange((event))} />
           </form>}
           {(!user && showModal) && <Modal handleClose={handleClose} />}
       </>
    )
}

export default AddPost;