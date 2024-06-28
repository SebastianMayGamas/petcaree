import React from 'react';
import styles from './styles/Post.module.css';

const Post = ({ user, text, image }) => {
    // Asignar una imagen de marcador de posición si user.photoURL no está definido
    const userProfileImage = user.photoURL || "https://via.placeholder.com/50";

    return (
        <div className={styles.post}>
            <div className={styles.userInfo}>
                <img src={userProfileImage} alt="User" className={styles.userImage} />
                <span>{user.displayName} ({user.email})</span>
            </div>
            <p>{text}</p>
            {image && <img src={image} alt="Post" className={styles.postImage} />}
            <div className={styles.actions}>
                <button>Comentar</button>
                <button>Compartir</button>
            </div>
        </div>
    );
};

export default Post;
