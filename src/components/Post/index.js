import React, {useState, useContext} from 'react';
import {UserContext} from "../../providers/UserProvider";
import {db} from "../../firebase/firebase";
import Comment from "../Comment";
import './index.scss';
import * as Icon from 'react-feather';
import {v4 as uuidv4} from 'uuid'

function Post({post, setShowModal}) {
    const user = useContext(UserContext);
    const [inputValue, setInputValue] = useState('');
    const {author, authorId, avatar, comments, createdAt, likes, postContent} = post.data;
    const [showComments, setShowComments] = useState(false);

    const removePost = () => {
        db.collection('posts').doc(post['id']).delete();
    }

    const removeComment = commentId => {
        const id = comments.indexOf(commentId);
        comments.splice(id, 1);

        db.collection('posts').doc(post['id']).update({
            comments: [...comments]
        })
    }

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
            comments: [...comments, {id: uuidv4(), author: user.uid, message: inputValue, avatar: user.photoURL, displayName: user.displayName}]
        })

        setInputValue('');
    }

    return (
        <div className="post">
            {user && post.data.authorId === user.uid && <button className="remove__btn" onClick={() => removePost()}>X</button>}
            <div className="post__information">
                <img src={avatar} alt="avatar" />
                <div>
                    <a href={`/profile/${authorId}`}><p className="post__information__author">{author}</p></a>
                    <p className="post__information__date">{createdAt}</p>
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
                    <p>{comments ? <button onClick={() => setShowComments(!showComments)}>{`${comments.length} comments`}</button> : '0 comments'}</p>
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
            {(showComments && comments.length > 0) && comments.map(comment => <Comment comment={comment} key={comment.id} removeComment={removeComment} />) }
        </div>
    )
}

export default Post;