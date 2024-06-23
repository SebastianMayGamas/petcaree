import React, { useState } from 'react';
import Post from './Post';
import styles from './styles/Home.module.css';
import feedStyles from './styles/Feed.module.css';
import NavBar from './NavBar';
import Eventos from './Eventos';
import imagenPost1 from '../imagenes/ibwnc.jpg';
import imagenPost2 from '../imagenes/catgrr.jpg';
import imagenPost3 from '../imagenes/dogue.jpg';
import imagenPost4 from '../imagenes/omgcat.jpg';
import BotonPublic from './BotonPublic';

const Home = () => {
    const [posts, setPosts] = useState([
        { user: 'Alexander Notch', text: 'Me encanta la naturaleza, en especial estar alimentando a mis animales.', image: imagenPost1 },
        { user: 'Carmelita Florinta Mass Chi', text: 'Admiren a mi bella hija gatuna. ¡Es un amor!', image: imagenPost2 },
        { user: 'Carlota Secill', text: '¡Hola! Espero puedan ayudarme con los cuidados de mi perro.', image: imagenPost3 },
        { user: 'Matias Salazar', text: '¡Hola, mundo! Esta es mi primera publicación en la red social o lo que sea. Este es mi gato.', image: imagenPost4 }
    ]);

    const handleAddPost = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    return (
        <div className={styles.home}>
            <NavBar />
            <div className={styles.content}>
                <BotonPublic onAddPost={handleAddPost} />
                <div className={feedStyles.feed}>
                    {posts.map((post, index) => (
                        <Post key={index} user={post.user} text={post.text} image={post.image} />
                    ))}
                </div>
            </div>
            <footer className={styles.footer}>
                <p>&copy; 2024 Red Social. Todos los derechos reservados.</p>
            </footer>
            <Eventos />
        </div>
    );
};

export default Home;
