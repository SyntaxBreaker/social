import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {db} from '../../firebase/firebase';
import Post from "../../components/Post";
import './index.scss';

function Profile() {
    const [posts, setPosts] = useState([]);
    const [profileInformation, setProfileInformation] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        async function fetchProfileInformation() {
            await db.collection("users").doc(id).onSnapshot(doc => {
                setProfileInformation(doc.data());
            })
        }

        fetchProfileInformation()
    }, [])

    useEffect(() => {
        async function fetchPosts() {
            await db.collection("posts").where("authorId", "==", id).onSnapshot(doc => {
                let fetchedPosts = doc.docs.map(item => {
                    return {
                        id: item.id,
                        data: item.data()
                    }
                });
                setPosts(fetchedPosts);
            })
        }

        fetchPosts();
    }, [])


    return (
        <div className="profile">
            <div className="profile__information">
                {profileInformation && (
                    <>
                        <h2>{profileInformation.displayName}</h2>
                        <p>{profileInformation.city}</p>
                        <a href={`https://www.${profileInformation.website}`}><p>{profileInformation.website}</p></a>
                    </>
                )}
            </div>
            <div className="profile__posts">
                {posts.map(post => <Post post={post} key={post.id} />)}
            </div>
        </div>
    )
}

export default Profile;