import React, { useState, useEffect } from 'react';
import styles from './Perfil.module.css';
import NavBar from "./NavBar";
import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../configuredatabase'; // Asegúrate de importar tu configuración de Firebase
import Button from "@mui/material/Button";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const Perfil = () => {
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            setEmail(user.email);
            setId(user.uid);
            setName(user.displayName);
            setImage(user.photoURL);
        }
    }, []);

    useEffect(() => {
        if (id) {
            const fetchUserPosts = async () => {
                try {
                    // Filtra las publicaciones por el uid del usuario actual
                    const q = query(
                        collection(db, 'posts'),
                        where('user.uid', '==', id)
                    );
                    const querySnapshot = await getDocs(q);
                    const userPosts = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setPosts(userPosts);
                } catch (error) {
                    console.error('Error al obtener publicaciones del usuario:', error);
                }
            };

            fetchUserPosts();
        }
    }, [id]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));

            const storage = getStorage();
            const storageRef = ref(storage, `profileImages/${file.name}`);

            uploadBytes(storageRef, file).then((snapshot) => {
                getDownloadURL(storageRef).then((downloadURL) => {
                    const auth = getAuth();
                    const user = auth.currentUser;
                    if (user) {
                        updateProfile(user, {
                            photoURL: downloadURL
                        }).then(() => {
                            setImage(downloadURL);
                        }).catch((error) => {
                            console.error('Error al actualizar imagen de perfil:', error);
                        });
                    }
                });
            }).catch((error) => {
                console.error('Error al subir imagen:', error);
            });
        }
    };

    const handleDeletePost = async (postId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta publicación?')) {
            try {
                await deleteDoc(doc(db, 'posts', postId));
                alert('Publicación eliminada con éxito');
                setPosts(posts.filter(post => post.id !== postId));
            } catch (error) {
                console.error('Error eliminando la publicación: ', error);
                alert('Hubo un error al intentar eliminar la publicación.');
            }
        }
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
                        <label>Id: {id}</label>
                        <label>Email: {email}</label>
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.button} onClick={() => console.log('Editar perfil')}>Editar Perfil</button>
                    <button className={`${styles.button} ${styles.delete}`} onClick={() => console.log('Eliminar perfil')}>Eliminar Perfil</button>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.profileHeader}>
                    <h2>Editar Imagen de Perfil</h2>
                </div>
                <div className={styles.profilechangeinage}>
                    <Button
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                    >
                        Subir imagen
                        <input
                            type="file"
                            onChange={handleImageChange}
                            style={{
                                clip: 'rect(0 0 0 0)',
                                clipPath: 'inset(50%)',
                                height: 1,
                                overflow: 'hidden',
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                whiteSpace: 'nowrap',
                                width: 1,
                            }}
                        />
                    </Button>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.profileHeader}>
                    <h2>Publicaciones</h2>
                </div>
                <div className={styles.postsList}>
                    {posts.length > 0 ? (
                        posts.map(post => (
                            <div key={post.id} className={styles.postItem}>
                                <h3>{post.title}</h3>
                                <p>{post.content}</p>
                                {post.image && <img src={post.image} alt="Post" style={{ maxWidth: '100%' }} />}
                                <IconButton aria-label="delete" onClick={() => handleDeletePost(post.id)} color="primary">
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        ))
                    ) : (
                        <p>No tienes publicaciones.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Perfil;
