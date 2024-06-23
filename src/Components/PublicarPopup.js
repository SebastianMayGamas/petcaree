import React, { useState } from 'react';
import styles from './PublicarPopup.module.css';
import imagenLogo from '../imagenes/logo.png';

const PublicarPopup = ({ onClose, onAddPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      user: 'Nombre de usuario', // Ajusta según sea necesario
      text: `${title}\n\n${content}`,
      image: 'https://via.placeholder.com/180' // Ajusta para permitir la carga de imágenes reales
    };
    onAddPost(newPost);
    onClose();
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.header}>
            <div className={styles.logoAndUser}>
              <img src={imagenLogo} alt="Logo" className={styles.logo} />
              <span className={styles.username}>Nombre de usuario</span>
            </div>
            <button type="submit" className={styles.submitButton}>Publicar</button>
          </div>
          <label className={styles.label}>
            Título:
            <input type="text" name="title" value={title} onChange={handleTitleChange} className={styles.input} />
          </label>
          <label className={styles.label}>
            Contenido:
            <textarea name="content" value={content} onChange={handleContentChange} className={styles.textarea}></textarea>
          </label>
          <button type="button" className={styles.uploadButton}>Seleccionar Imagen</button>
          <button type="button" className={styles.locationButton}>Seleccionar Ubicación</button>
        </form>
      </div>
    </div>
  );
};

export default PublicarPopup;
