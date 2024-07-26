import React, { useState } from 'react';
import styles from './styles/PostReport.module.css';
import { doc, updateDoc,} from 'firebase/firestore'; // Importa Firestore
import {db} from '../../../../../configuredatabase'; // Importa la configuración de Firestore
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


const mapContainerStyle = {
  height: '200px', // Ajusta el tamaño del mapa según sea necesario
  width: '100%',
};

const Post = ({ user, title, content, image, location, postId }) => {
  const [reportModalOpen, setReportModalOpen] = useState(false); // Estado para el modal de reporte

  // Asignar una imagen de marcador de posición si user.photoURL no está definido
  const userProfileImage = user.photoURL || "https://via.placeholder.com/50";



  const handleUnblock = async () => {
    try {
      if (!postId) {
        throw new Error("postId is undefined");
      }

      // Referencia al documento del post en Firestore
      const postRef = doc(db, 'posts', postId);

      // Actualiza el campo reportado a false
      await updateDoc(postRef, { reportado: false });
      console.log(`Post desbloqueado: ${title}`);
      alert(`Has desbloqueado el post: ${title}`);
    } catch (error) {
      console.error("Error desbloqueando el post: ", error);
      alert(`Hubo un error desbloqueando el post: ${error.message}`);
    }
  };

  const handleCloseReportModal = () => {
    // Cierra el modal de reporte
    setReportModalOpen(false);
  };

  return (
      <div className={styles.post}>
        <div className={styles.userInfo}>
          <img src={userProfileImage} alt="User" className={styles.userImage} />
          <span className={styles.userName}>{user.displayName} ({user.email})</span>
        </div>
        <h3 className={styles.postTitle}>{title}</h3>
        <p className={styles.postText}>{content}</p>
        {image && <img src={image} alt="Post" className={styles.postImage} />}
        {location && (
            <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
              <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={location}
                  zoom={13}
              >
                <Marker position={location} />
              </GoogleMap>
            </LoadScript>
        )}
        <div className={styles.actions}>
          <button onClick={handleUnblock}>Quitar Bloqueo</button>
            <button>Eliminar</button>
        </div>

      </div>
  );
};

export default Post;
