import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "../../providers/UserProvider";
import {db} from "../../firebase/firebase";
import Post from "../../components/Post";
import Navigation from "../../components/Navigation";
import AddPost from "../../components/AddPost";
import './index.scss';


function Homepage() {
    const user = useContext(UserContext);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            let posts = [];

            await db.collection("posts").get()
                .then(item => {
                    item.docs.map(item => posts.push({id: item.id, data: item.data()}))
                })

            setPosts(posts);
        }

        fetchPosts();
    }, [])

    useEffect(() => {
        async function fetchPosts() {
            let posts = [];

            await db.collection("posts").get()
                .then(item => {
                    item.docs.map(item => posts.push({id: item.id, data: item.data()}))
                })

            setPosts(posts);
        }

        fetchPosts();
    }, [posts])

    return (
        <main>
            <div className="main__left">
                <div className="main__left__profile">
                    {user && <img src={user.photoURL} alt="avatar" />}
                    <h2>{user ? user.displayName : 'Anonymous'}</h2>
                </div>
                <Navigation />
            </div>
            <div className="main__right">
                <AddPost />
                {posts.map(post => <Post post={post} key={post.id} />)}
            </div>
        </main>
    )
}

export default Homepage;