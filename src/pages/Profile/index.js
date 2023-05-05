import React, {useState, useEffect, useContext} from 'react';
import {Helmet} from "react-helmet";
import {useParams} from 'react-router-dom';
import {db} from '../../firebase/firebase';
import Post from "../../components/Post";
import * as Icon from 'react-feather';
import Modal from "../../components/Modal";
import {UserContext} from "../../providers/UserProvider";
import './index.scss';

function Profile() {
    const [posts, setPosts] = useState([]);
    const [profileInformation, setProfileInformation] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const {id} = useParams();
    const user = useContext(UserContext);

    useEffect(() => {
        async function fetchProfileInformation() {
            await db.collection("users").doc(id).onSnapshot(doc => {
                setProfileInformation(doc.data());
            })
        }

        fetchProfileInformation()
    }, [id])

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
    }, [id])

    const handleClose = () => {
        setShowModal(false);
    }


    return (
        <>
            <Helmet>
                <title>{profileInformation ? `${profileInformation.displayName}` : 'Profile not found!'}</title>
            </Helmet>
            <div className="profile">
                <div className="profile__information">
                    {profileInformation ? (
                        <>
                            <img src={profileInformation.avatar} alt="User's avatar" />
                            <h2>{profileInformation.displayName}</h2>
                            {profileInformation.city !== null && <p><Icon.MapPin/> {profileInformation.city}</p>}
                            {profileInformation.website !== null &&
                            <a href={`https://www.${profileInformation.website}`}><p>
                                <Icon.Globe/> {profileInformation.website}</p></a>}
                        </>
                    ) : <h2>Profile not found</h2>}
                </div>
                <div className="profile__posts">
                    {posts.map(post => <Post post={post} setShowModal={setShowModal} key={post.id}/>)}
                    {(!user && showModal) && <Modal handleClose={handleClose} />}
                </div>
            </div>
        </>

    )
}

export default Profile;