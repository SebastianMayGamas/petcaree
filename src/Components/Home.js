import React from 'react';
import Post from './Post';
import styles from './styles/Home.module.css';
import feedStyles from './styles/Feed.module.css';
import NavBar from './NavBar';
import Eventos from './Eventos';
import imagenPost1 from '../imagenes/ibwnc.jpg'; 
import imagenPost2 from '../imagenes/catgrr.jpg';
import imagenPost3 from '../imagenes/dogue.jpg';
import imagenPost4 from '../imagenes/omgcat.jpg';

const Home = () => {
  return (
    <div className={styles.home}>

      <NavBar />
      <div className={styles.content}>
        <div className={feedStyles.feed}>
          <Post user="Alexander Notch" text="Me encanta la naturaleza, en especial estar alimentando a mis animales." image={imagenPost1} />
          <Post user="Carmelita Florinta Mass Chi" text="Admiren a mi bella hija gatuna. ¡Es un amor!" image={imagenPost2} />
          <Post user="Carlota Secill" text="¡Hola! Espero puedan ayudarme con los cuidados de mi perro." image={imagenPost3} />
          <Post user="Matias Salazar" text="¡Hola, mundo! Esta es mi primera publicación en la red social o lo que sea. Este es mi gato." image={imagenPost4} />
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
