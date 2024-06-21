// Amigos.js
/*import React from 'react';

const Amigos = () => {
    return (
        <div>
            <h2>Amigos</h2>
            <p>Aquí puedes ver tus amigos.</p>
        </div>
    );
};

export default Amigos;
*/


import React from 'react';
import NavBar from './NavBar';
import styles from './Amigos.module.css'; // Importa el archivo de estilos CSS
import imagenUser from '../imagenes/jsnd.png';

const amigos = [
  { id: 1, nombre: 'Jessica Chi', imagen: 'https://via.placeholder.com/50', urlVer: '/perfil/1', urlMensaje: '/mensaje/1' },
  { id: 2, nombre: 'Pablo Cordova', imagen: 'https://via.placeholder.com/50', urlVer: '/perfil/2', urlMensaje: '/mensaje/2' },
  { id: 3, nombre: 'Manuelita Estrella Garcia Nuet', imagen: 'https://via.placeholder.com/50', urlVer: '/perfil/3', urlMensaje: '/mensaje/3' },
  { id: 4, nombre: 'JonyKiraXd', imagen: 'https://via.placeholder.com/50', urlVer: '/perfil/4', urlMensaje: '/mensaje/4' },
  { id: 5, nombre: 'Diego Armando Ruiz Tred', imagen: 'https://via.placeholder.com/50', urlVer: '/perfil/5', urlMensaje: '/mensaje/5' },
  // Agrega más amigos si lo deseas
];

function Amigos() {
  return (
    <div className={styles.amigosPage}>
      <NavBar />
      <h2>Amigos ({amigos.length})</h2>
      <div className={styles.amigosList}>
        {amigos.map((amigo) => (
          <div key={amigo.id} className={styles.amigoCard}>
            <img className={styles.amigoImg} src={amigo.imagen} alt={amigo.nombre} />
            <div className={styles.amigoInfo}>
              <span className={styles.amigoName}>{amigo.nombre}</span>
              <div className={styles.amigoButtons}>
                <a className={styles.amigoButton} href={amigo.urlVer}>Ver</a>
                <a className={styles.amigoButton} href={amigo.urlMensaje}>Mensaje</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Amigos;
