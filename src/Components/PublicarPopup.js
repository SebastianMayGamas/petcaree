import React, { useState, useEffect } from 'react';
import styles from './PublicarPopup.module.css';
import imagenLogo from '../imagenes/logo.png';
import { uploadfile } from '../configuredatabase';
import { getAuth } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../configuredatabase';
import { useNavigate } from 'react-router-dom';
import Mapa from './Mapa';

const PublicarPopup = ({ onClose, onAddPost }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [profileImage, setProfileImage] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setEmail(user.email);
      setName(user.displayName);
      setProfileImage(user.photoURL || 'https://via.placeholder.com/50');
    }
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handlePostImageChange = (e) => {
    setPostImage(e.target.files[0]);
  };

  const handleLocationSelect = (location) => {
    setLocation(location);
    setShowMap(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit button clicked');

    let postImageUrl = 'https://via.placeholder.com/180';
    if (postImage) {
      try {
        postImageUrl = await uploadfile(postImage);
        console.log('Uploaded a blob or file!', postImageUrl);
      } catch (error) {
        console.error('Error al subir la imagen de la publicación: ', error);
      }
    }

    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      alert('Usuario no autenticado.');
      return;
    }

    const newPost = {
      user: {
        uid: currentUser.uid,
        email: email,
        displayName: name,
        photoURL: profileImage,
      },
      title: title,
      content: content,
      image: postImageUrl,
      location: location,
      report: false,
      createdAt: new Date(),
    };

    try {
      await addDoc(collection(db, 'posts'), newPost);

      // Crear y despachar el evento personalizado
      const event = new CustomEvent('postAdded', { detail: newPost });
      window.dispatchEvent(event);

      console.log('Closing popup');
      onClose();
    } catch (error) {
      console.error('Error al guardar la publicación: ', error);
    }
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <button
          className={styles.closeButton}
          onClick={() => {
            console.log('Close button clicked');
            onClose();
          }}
        >
          X
        </button>
        {!showMap ? (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.header}>
              <div className={styles.logoAndUser}>
                <img src={imagenLogo} alt="Logo" className={styles.logo} />
                <span className={styles.username}>{name}</span>
              </div>
              <button type="submit" className={styles.submitButton}>
                Publicar
              </button>
            </div>
            <label className={styles.label}>
              Título:
              <input
                type="text"
                name="title"
                value={title}
                onChange={handleTitleChange}
                className={styles.input}
                required
              />
            </label>
            <label className={styles.label}>
              Contenido:
              <textarea
                name="content"
                value={content}
                onChange={handleContentChange}
                className={styles.textarea}
                required
              ></textarea>
            </label>
            <input
              type="file"
              className={styles.uploadButton}
              onChange={handlePostImageChange}
            />
            <button
              type="button"
              className={styles.locationButton}
              onClick={() => setShowMap(true)}
            >
              Seleccionar Ubicación
            </button>
          </form>
        ) : (
          <div>
            <Mapa onSelectLocation={handleLocationSelect} />
            <div className={styles.mapButtons}>
              <button onClick={() => setShowMap(false)}>Cancelar</button>
              <button onClick={() => setShowMap(false)}>Aceptar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicarPopup;
