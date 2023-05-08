import React, { useContext, useState } from "react";
import { UserContext } from "../../providers/UserProvider";
import { db } from "../../firebase/firebase";
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
        const now = new Date().toLocaleDateString();

        const post = {
            author: user.displayName,
            authorId: user.uid,
            avatar: user.photoURL,
            postContent: newPostContent,
            tags: newPostTags,
            createdAt: now,
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
            <form onSubmit={event => user ? onSubmit(event) : toggleModal(event)} className="form">
                <input type="text" name="newPost" value={newPostContent} placeholder={`What's happening?`} onChange={(event) => onChange((event))} className="form__input" />
            </form>
            {(!user && showModal) && <Modal handleClose={handleClose} />}
        </>
    )
}

export default AddPost;