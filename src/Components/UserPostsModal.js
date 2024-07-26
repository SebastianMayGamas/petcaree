import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../configuredatabase';
import Post from './Post';
import styles from './styles/UserPostsModal.module.css';

const UserPostsModal = ({ userId, onClose }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (userId) {
            const fetchUserPosts = async () => {
                const q = query(collection(db, 'posts'), where('user.uid', '==', userId));
                const querySnapshot = await getDocs(q);
                const userPosts = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setPosts(userPosts);
            };

            fetchUserPosts();
        }
    }, [userId]);

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={onClose}>&times;</span>
                <h2>Publicaciones de {userId}</h2>
                {posts.length > 0 ? (
                    posts.map(post => (
                        <Post 
                            key={post.id}
                            user={post.user}
                            title={post.title}
                            content={post.content}
                            image={post.image}
                        />
                    ))
                ) : (
                    <p>No hay publicaciones disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default UserPostsModal;
