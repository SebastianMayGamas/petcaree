import React, { useState } from 'react';
import styles from './BotonPublic.module.css';
import PublicarPopup from './PublicarPopup';  
import imagenLogo from '../imagenes/logo.png';

const BotonPublic = ({ onAddPost }) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className={styles.centerContainer}>
      <div className={styles.publicarButtonContainer}>
        <img src={imagenLogo} alt="Logo" className={styles.logo} />
        <button onClick={togglePopup} className={styles.publicarButton}>Publicar</button>
      </div>
      {showPopup && <PublicarPopup onClose={togglePopup} onAddPost={onAddPost} />}
    </div>
  );
};

export default BotonPublic;
