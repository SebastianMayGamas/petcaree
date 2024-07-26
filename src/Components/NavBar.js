import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles/NavBar.module.css';
import imagenLogo from '../imagenes/logo.png';
import { signOut } from "firebase/auth";
import { auth } from '../configuredatabase'; // Asegúrate de que la ruta es correcta

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Sesión cerrada exitosamente.");
        navigate('/'); // Redirigir a la página de inicio de sesión
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  };

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
          <li><Link to="/perfil">Perfil</Link></li>
          <li><Link to="/publicidad">Publicidad</Link></li>
          <li>
            <button onClick={handleSignOut} className={styles.signOutButton}>Cerrar Sesión</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;

