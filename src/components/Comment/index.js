import React from 'react';
import './index.scss';

function Comment({comment}) {
    return (
        <div className="comment">
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