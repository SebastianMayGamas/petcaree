import React, { useState, useEffect } from 'react';
import styles from './PublicarPopup.module.css';
import imagenLogo from '../imagenes/logo.png';
import { uploadfile } from '../configuredatabase'; // Asegúrate de que esta función devuelva la URL de la imagen cargada
import { getAuth } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../configuredatabase';

const PublicarPopup = ({ onClose, onAddPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setEmail(user.email);
      setName(user.displayName);
      setImage(user.photoURL);
    }
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = 'https://via.placeholder.com/180'; // URL predeterminada
    if (image) {
      try {
        imageUrl = await uploadfile(image);
      } catch (error) {
        console.error('Error al subir la imagen: ', error);
      }
    }

    const newPost = {
      user: {
        email: email,
        displayName: name,
        photoURL : imageUrl
      },
      title: title,
      content: content,
      image: imageUrl,
      createdAt: new Date()
    };

    try {
      await addDoc(collection(db, 'posts'), newPost);
      onAddPost(newPost);
      onClose();
    } catch (error) {
      console.error('Error al guardar la publicación: ', error);
    }
  };

  return (
      <div className={styles.popupOverlay}>
        <div className={styles.popupContent}>
          <button className={styles.closeButton} onClick={onClose}>X</button>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.header}>
              <div className={styles.logoAndUser}>
                <img src={imagenLogo} alt="Logo" className={styles.logo} />
                <span className={styles.username}>{name}</span> {/* Asegúrate de no renderizar un objeto */}
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
            <input type="file" className={styles.uploadButton} onChange={handleImageChange} />
            <button type="button" className={styles.locationButton}>Seleccionar Ubicación</button>
          </form>
        </div>
      </div>
  );
};

export default PublicarPopup;
