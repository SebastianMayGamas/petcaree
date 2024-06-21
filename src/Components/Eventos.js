import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles/Eventos.module.css';
import imagenLogo from '../imagenes/logo.png';

const Eventos = () => {
  return (
    <nav className={styles.eventos}>
      <p className={styles.adTitule}>Anuncios</p>
      <div className={styles.adContainer1}>
        <img src={imagenLogo} alt="Logo" className={styles.logo} />
        <p className={styles.adText1}>Este es un anuncio</p>
      </div>
      <div className={styles.adContainer1}>
        <img src={imagenLogo} alt="Logo" className={styles.logo} />
        <p className={styles.adText1}>Este es un anuncio</p>
      </div>
      <div className={styles.adContainer1}>
        <img src={imagenLogo} alt="Logo" className={styles.logo} />
        <p className={styles.adText1}>Este es un anuncio</p>
      </div>
    </nav>
  );
};

export default Eventos;