import React, {useState, useEffect} from 'react';
import {Helmet} from "react-helmet";
import {useParams} from 'react-router-dom';
import {db} from '../../firebase/firebase';
import Post from "../../components/Post";
import './index.scss';
import * as Icon from 'react-feather';

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
        <>
            <Helmet>
                <title>{profileInformation ? `${profileInformation.displayName}` : 'Profile not found!'}</title>
            </Helmet>
            <div className="profile">
                <div className="profile__information">
                    {profileInformation ? (
                        <>
                            <img src={profileInformation.avatar}/>
                            <h2>{profileInformation.displayName}</h2>
                            {profileInformation.city !== null && <p><Icon.MapPin/> {profileInformation.city}</p>}
                            {profileInformation.website !== null &&
                            <a href={`https://www.${profileInformation.website}`}><p>
                                <Icon.Globe/> {profileInformation.website}</p></a>}
                        </>
                    ) : <h2>Profile not found</h2>}
                </div>
                <div className="profile__posts">
                    {posts.map(post => <Post post={post} key={post.id}/>)}
                </div>
            </div>
        </>

    )
}

export default Profile;