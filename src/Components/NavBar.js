import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles/NavBar.module.css';
import imagenLogo from '../imagenes/logo.png';

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/buscar?query=${searchQuery}`);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <img src={imagenLogo} alt="Logo" className={styles.logo} />
        <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>Buscar</button>
        </form>
      </div>
      <div className={styles.rightSection}>
        <ul className={styles.navList}>
          <li><Link to="/home">Inicio</Link></li>
          <li><Link to="/mapa">Mapa</Link></li>
          <li><Link to="/ayuda">Ayuda</Link></li>
          <li><Link to="/">Cerrar Sesion</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
