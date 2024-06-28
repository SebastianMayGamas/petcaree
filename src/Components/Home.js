import React, { useState, useEffect } from 'react';
import Post from './Post';
import styles from './styles/Home.module.css';
import feedStyles from './styles/Feed.module.css';
import NavBar from './NavBar';
import Eventos from './Eventos';
import BotonPublic from './BotonPublic';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../configuredatabase";
import { getAuth } from "firebase/auth";

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const querySnapshot = await getDocs(collection(db, "posts"));
            const postsArray = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPosts(postsArray);
        };

        fetchPosts();
    }, []);

    return (
        <div className={styles.home}>
            <NavBar />
            <div className={styles.content}>
                <BotonPublic />
                <div className={feedStyles.feed}>
                    {posts.map((post, index) => (
                        <Post
                            key={index}
                            user={post.user}
                            text={post.text}
                            image={post.image}
                            userProfileImage={post.userProfileImage} // Asegúrate de pasar la imagen de perfil del usuario
                        />
                    ))}
                </div>
            </div>
            <footer className={styles.footer}>
                <p>&copy; 2024 Petcare. Todos los derechos reservados.</p>
            </footer>
            <Eventos />
        </div>
    );
};

export default Home;

