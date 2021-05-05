import React, {useState, useContext} from 'react';
import {UserContext} from "../../providers/UserProvider";
import {db} from "../../firebase/firebase";
import Modal from "../Modal";

function Post({post}) {
    const user = useContext(UserContext);
    const [inputValue, setInputValue] = useState('');
    const {author, authorId, comments, createdAt, likes, postContent, shares, tags} = post.data;
    const [showModal, setShowModal] = useState(false);

    const addLike = () => {
        db.collection('posts').doc(post['id']).update({
            likes: [...likes, user.uid]
        })
    }

    const removeLike = () => {
        const id = likes.indexOf(user.uid);
        likes.splice(id, 1);

        db.collection('posts').doc(post['id']).update({
            likes: [...likes]
        })
    }

    const onChange = event => {
        setInputValue(event.target.value);
    }

    const addComment = event => {
        event.preventDefault();

        db.collection('posts').doc(post['id']).update({
            comments: [...comments, {author: user.uid, message: inputValue}]
        })

        setInputValue('');
    }

    const handleClose = () => {
        setShowModal(false);
    }

    return (
        <div className="post">
            <div className="post__information">
                <img alt="avatar" />
                <a href={`/profile/${authorId}`}><p>@{author}</p></a>
                <p>2m</p>
            </div>
            <div className="post__text">
                <p>{postContent}</p>
            </div>
            <div className="post__more__information">
                <div>
                    {likes.length}
                    {user ? likes.includes(user.uid) ? <button onClick={() => removeLike()}>Unlike</button> : <button onClick={() => addLike()}>Like</button> : <button onClick={() => setShowModal(true)}>Like</button>}
                </div>
                <div>
                    <p>{comments ? `${comments.length} comments` : '0 comments'}</p>
                </div>
            </div>
            <div className="post__comment__input">
                {user ?
                    <form onSubmit={event => addComment(event)}>
                        <input name="newComment" placeholder="Enter comment here" value={inputValue}
                               onChange={event => onChange(event)}/>
                    </form> :
                    <form onSubmit={(event) => {event.preventDefault(); setShowModal(true)}}>
                        <input name="newComment" placeholder="Enter comment here" value={inputValue}
                               onChange={event => onChange(event)}/>
                    </form>
                }
            </div>
            {(!user && showModal) && <Modal handleClose={handleClose} />}
        </div>
    )
}

export default Post;