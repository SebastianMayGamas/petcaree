
import React from 'react';
import styles from './styles/Header.module.css'; // Asegúrate de tener los estilos correctos

const Header = ({ onCreatePost }) => {
  return (
    <nav className={styles.navBar}>
      <h1>Red Social</h1>
      <button onClick={onCreatePost}>Crear Post</button>
    </nav>
  );
};

export default Header;
