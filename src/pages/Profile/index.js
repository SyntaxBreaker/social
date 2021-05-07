import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {db} from '../../firebase/firebase';
import Post from "../../components/Post";
import './index.scss';

function Profile() {
    const [posts, setPosts] = useState([]);
    const [author, setAuthor] = useState(null);
    const {id} = useParams();

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
                if(posts.length !== 0) {
                    setAuthor(posts[0].data.author);
                }
            })
        }

        fetchPosts();
    }, [])


    return (
        <div className="profile">
            <div className="profile__information">
                <h2>{author}</h2>
            </div>
            <div className="profile__posts">
                {posts.map(post => <Post post={post} key={post.id} />)}
            </div>
        </div>
    )
}

export default Profile;