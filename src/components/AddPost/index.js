import React, {useContext, useState} from "react";
import {UserContext} from "../../providers/UserProvider";
import firebase from "firebase";
import {db} from "../../firebase/firebase";
import './index.scss';

function AddPost() {
    const user = useContext(UserContext);
    const [newPostContent, setNewPostContent] = useState('');
    const [newPostTags, setNewPostTags] = useState([]);

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
    return (
        <form onSubmit={event => onSubmit(event)}>
            <input type="text" name="newPost" value={newPostContent} placeholder={`What's happening?`} onChange={(event) => onChange((event))} />
        </form>
    )
}

export default AddPost;