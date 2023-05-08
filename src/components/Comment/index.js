import React, {useContext} from 'react';
import {UserContext} from "../../providers/UserProvider";
import './index.scss';

function Comment({comment, removeComment}) {
    const user = useContext(UserContext);
    const {id} = comment;

    return (
        <div className="comment">
            {user && comment.author === user.uid && <button className="comment__button--remove" onClick={() => removeComment(id)}>X</button>}
                <img src={comment.avatar} alt="User's avatar" className="comment__avatar" />
            <div className="comment__body">
                <a href={`profile/${comment.author}`} className='comment__link'>@{comment.displayName}</a>
                <p className="comment__message">{comment.message}</p>
            </div>
        </div>
    )
}

export default Comment;