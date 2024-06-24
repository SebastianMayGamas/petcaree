import React from 'react';
import styles from './styles/Post.module.css';

const Post = ({ user, text, image }) => {
    return (
        <div className={styles.post}>
            <div className={styles.userInfo}>
                <img src="https://via.placeholder.com/50" alt="User" />
                <span>{user.displayName} ({user.email})</span>
            </div>
            <p>{text}</p>
            <img src={image} alt="Post" className={styles.imagenpost} />
            <div className={styles.actions}>
                <button>Comentar</button>
                <button>Compartir</button>
            </div>
        </div>
    );
};

export default Post;
