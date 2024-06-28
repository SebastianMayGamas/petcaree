import React, { useState, useEffect } from 'react';
import styles from './Perfil.module.css';
import NavBar from "./NavBar";
import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Perfil = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null); // Cambiado a null para manejar mejor la imagen

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            setEmail(user.email);
            setName(user.displayName);
            setImage(user.photoURL); // Inicializar la imagen desde Firebase si está disponible
        }
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        // Subir imagen a Firebase Storage
        const storage = getStorage();
        const storageRef = ref(storage, `profileImages/${file.name}`);

        uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Imagen subida correctamente');
            getDownloadURL(storageRef).then((downloadURL) => {
                // Actualizar la imagen de perfil en Firebase Authentication
                const auth = getAuth();
                const user = auth.currentUser;
                if (user) {
                    updateProfile(user, {
                        photoURL: downloadURL
                    }).then(() => {
                        console.log('Imagen de perfil actualizada');
                    }).catch((error) => {
                        console.error('Error al actualizar imagen de perfil:', error);
                    });
                }
            });
        }).catch((error) => {
            console.error('Error al subir imagen:', error);
        });
    };

    return (
        <div>
            <NavBar />
            <div className={styles.container}>
                <div className={styles.profileHeader}>
                    <h2>Perfil de Usuario</h2>
                </div>
                <div className={styles.profileInfo}>
                    <div className={styles.profileImage}>
                        <img className="perfil-img" src={image} alt={name} />

                    </div>
                    <div className={styles.userInfo}>
                        <label>Nombre: {name}</label>
                        <label>Email: {email}</label>
                    </div>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.profileHeader}>
                    <h2>Edicion del perfil</h2>
                </div>

                <div className={styles.profileInfo}>
                    <label>actualizar imagen</label>
                    <input type='file' onChange={handleImageChange}/>
                </div>
            </div>
        </div>
    );
};

export default Perfil;
