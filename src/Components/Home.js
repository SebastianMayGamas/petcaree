import React, { useState, useEffect } from 'react';
import Post from './Post';
import styles from './styles/Home.module.css';
import feedStyles from './styles/Feed.module.css';
import NavBar from './NavBar';
import Eventos from './Eventos';
import BotonPublic from './BotonPublic';
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "../configuredatabase";

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const q = query(collection(db, "posts"),
                where("report", "==", false), // Filtrar posts no reportados
                orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                const postsArray = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setPosts(postsArray);
            } catch (error) {
                console.error("Error obteniendo los posts: ", error);
            }
        };

        fetchPosts();

        // Escuchar el evento personalizado
        const handlePostAdded = (event) => {
            setPosts((prevPosts) => [event.detail, ...prevPosts]);
        };

        window.addEventListener('postAdded', handlePostAdded);

        return () => {
            window.removeEventListener('postAdded', handlePostAdded);
        };
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
                            postId={post.id} // Pasa el id como prop
                            user={post.user}
                            title={post.title} // Mostrar el título del post
                            content={post.content} // Mostrar el contenido del post
                            image={post.image}
                            userProfileImage={post.user?.photoURL} // Imagen de perfil del usuario, si está disponible
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
