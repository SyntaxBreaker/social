import React, {useContext} from 'react';
import {UserContext} from "../../providers/UserProvider";
import './index.scss';

function Comment({comment, removeComment}) {
    const user = useContext(UserContext);
    const {id} = comment;

    return (
        <div className="comment">
            {user && comment.author === user.uid && <button className="remove__comment__btn" onClick={() => removeComment(id)}>X</button>}
            <div className="comment__avatar">
                <img src={comment.avatar} />
            </div>
            <div>
                <a href={`profile/${comment.author}`}><h3>@{comment.displayName}</h3></a>
                <p className="comment__message">{comment.message}</p>
            </div>
        </div>
    )
}

export default Comment;