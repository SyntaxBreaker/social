import React, {useState, useContext, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {db} from '../../firebase/firebase';
import Post from "../../components/Post";

function Profile() {
    const [posts, setPosts] = useState([]);
    const {id} = useParams();

    const fetchPosts = async () => {
        let posts = [];

        await db.collection("posts").where("authorId", "==", id).get()
            .then(item => {
                item.docs.map(item => posts.push({id: item.id, data: item.data()}))
            })

        setPosts(posts);
    }

    useEffect(async () => {
        fetchPosts()
    }, [])

    useEffect(async () => {
        fetchPosts()
    }, [posts])

    return (
        <div className="profile">
            <div className="profile_information">
                <h2>Elon Musk</h2>
            </div>
            <div className="profile__posts">
                {posts.map(post => <Post post={post} />)}
            </div>
        </div>
    )
}

export default Profile;