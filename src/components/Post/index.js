import React, {useState, useContext} from 'react';
import {UserContext} from "../../providers/UserProvider";
import {db} from "../../firebase/firebase";
import Modal from "../Modal";
import './index.scss';
import * as Icon from 'react-feather';

function Post({post}) {
    const user = useContext(UserContext);
    const [inputValue, setInputValue] = useState('');
    const {author, authorId, avatar, comments, createdAt, likes, postContent, shares, tags} = post.data;
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
                <img src={avatar} alt="avatar" />
                <div>
                    <a href={`/profile/${authorId}`}><p className="post__information__author">{author}</p></a>
                    <p className="post__information__date">2m</p>
                </div>
            </div>
            <div className="post__text">
                <p>{postContent}</p>
            </div>
            <div className="post__more__information">
                <div>
                    {user ? likes.includes(user.uid) ? <button onClick={() => removeLike()}><Icon.Heart color="red" size={18} /></button> : <button onClick={() => addLike()}><Icon.Heart color="black" size={18} /></button> : <button onClick={() => setShowModal(true)}><Icon.Heart color="black" size={18} /></button>}
                    {likes.length}
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