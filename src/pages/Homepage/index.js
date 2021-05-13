import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "../../providers/UserProvider";
import {db} from "../../firebase/firebase";
import Post from "../../components/Post";
import Navigation from "../../components/Navigation";
import AddPost from "../../components/AddPost";
import './index.scss';
import {Helmet} from "react-helmet";


function Homepage() {
    const user = useContext(UserContext);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            await db.collection("posts").onSnapshot(snapshot => {
                let postsArray = snapshot.docs.map(doc => {
                    return {
                        id: doc.id,
                        data: doc.data()
                    }
                })

                setPosts(postsArray)
            })
        }

        fetchPosts();
    }, [])

    return (
        <main>
            <Helmet>
                <title>Homepage</title>
            </Helmet>
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