import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "../../providers/UserProvider";
import {db} from "../../firebase/firebase";
import Post from "../../components/Post";
import Navigation from "../../components/Navigation";
import AddPost from "../../components/AddPost";
import {Helmet} from "react-helmet";
import Modal from '../../components/Modal';
import './index.scss';

function Homepage() {
    const user = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const [showModal, setShowModal] = useState(false);

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

    const handleClose = () => {
        setShowModal(false);
    }

    return (
        <main className="main">
            <Helmet>
                <title>Homepage</title>
            </Helmet>
            <div className="main__left">
                <div className="main__profile">
                    {user && <img src={user.photoURL} alt="avatar" className="main__img" />}
                    <h2 class="main__displayName">{user ? user.displayName : 'Anonymous'}</h2>
                </div>
                <Navigation />
            </div>
            <div className="main__right">
                <AddPost />
                {posts.map(post => <Post post={post} setShowModal={setShowModal} key={post.id} />)}
                {(!user && showModal) && <Modal handleClose={handleClose} />}
            </div>
        </main>
    )
}

export default Homepage;