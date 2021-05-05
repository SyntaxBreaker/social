import React, {useState, useEffect, useCallback} from 'react';
import {useParams} from 'react-router-dom';
import {db} from '../../firebase/firebase';
import Post from "../../components/Post";

function Profile() {
    const [posts, setPosts] = useState([]);
    const [author, setAuthor] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        async function fetchPosts() {
            let posts = [];

            await db.collection("posts").where("authorId", "==", id).get()
                .then(item => {
                    item.docs.map(item => posts.push({id: item.id, data: item.data()}))
                })

            setPosts(posts);
            if(posts.length !== 0) {
                setAuthor(posts[0].data.author);
            }
        }

        fetchPosts();
    }, [])

    useEffect(() => {
        async function fetchPosts() {
            let posts = [];

            await db.collection("posts").where("authorId", "==", id).get()
                .then(item => {
                    item.docs.map(item => posts.push({id: item.id, data: item.data()}))
                })

            setPosts(posts);
        }

        fetchPosts();
    }, [posts])

    return (
        <div className="profile">
            <div className="profile_information">
                <h2>{author}</h2>
            </div>
            <div className="profile__posts">
                {posts.map(post => <Post post={post} key={post.id} />)}
            </div>
        </div>
    )
}

export default Profile;