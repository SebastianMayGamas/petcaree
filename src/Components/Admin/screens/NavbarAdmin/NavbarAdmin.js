import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/NavbarAdmin.module.css';
import {signOut} from "firebase/auth";
import {auth} from "../../../../configuredatabase"; // Asegúrate de tener un archivo de estilos para la barra de navegación
import {useNavigate} from "react-router-dom";

function NavbarAdmin() {

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
  return (
      <nav className={styles.navbar}>
          <ul className={styles.navList}>
              <li>
                  <Link to="/admin/reportes" className={styles.navLink}>Reportes</Link>
              </li>
              <li>
                  <Link to="/admin/useradmin" className={styles.navLink}>Usuarios</Link>
              </li>
              <li>
                  <Link to="/admin/anuncio" className={styles.navLink}>Anuncios</Link>
              </li>
          </ul>
          <div className={styles.rightSection}>
              <button onClick={handleSignOut} className={styles.signOutButton}>Cerrar sesión</button>
          </div>
      </nav>
  );
}

export default NavbarAdmin;
