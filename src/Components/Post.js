import React, { useState, useEffect } from 'react';
import styles from './styles/Post.module.css';
import { doc, updateDoc, getDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../configuredatabase';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Reportar from './Reportar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getAuth } from 'firebase/auth';
import { Popover, QRCode } from 'antd';

const mapContainerStyle = {
    height: '200px',
    width: '100%',
};

const Post = ({ user, title, content, image, location, postId, onRescatado }) => {
    const [reportModalOpen, setReportModalOpen] = useState(false);
    const [isRescatado, setIsRescatado] = useState(false);
    const [commentModalOpen, setCommentModalOpen] = useState(false);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [postUser, setPostUser] = useState(null);

    const userProfileImage = user?.photoURL || "https://via.placeholder.com/50";

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                if (!postId) return;

                const postRef = doc(db, 'posts', postId);
                const postDoc = await getDoc(postRef);

                if (postDoc.exists()) {
                    const postData = postDoc.data();
                    setPostUser(postData.user);
                    setComments(postData.comentarios || []);
                    setIsRescatado(postData.rescatado || false);
                }
            } catch (error) {
                console.error("Error obteniendo datos del post: ", error);
            }
        };

        fetchPostData();
    }, [postId]);

    const handleCommentSubmit = async () => {
        if (comment.length > 100) {
            alert("El comentario no puede tener más de 100 caracteres.");
            return;
        }

        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;

            if (!currentUser || !currentUser.displayName || !currentUser.uid) {
                throw new Error("Usuario no autenticado o información incompleta.");
            }

            const postRef = doc(db, 'posts', postId);
            const newComment = {
                text: comment,
                userName: currentUser.displayName,
                userId: currentUser.uid,
                timestamp: new Date()
            };

            await updateDoc(postRef, {
                comentarios: arrayUnion(newComment)
            });

            setComments([...comments, newComment]);
            setComment("");
            handleCloseCommentModal();
        } catch (error) {
            console.error("Error agregando el comentario: ", error);
            alert(`Hubo un error agregando el comentario: ${error.message}`);
        }
    };

    const handleRescatado = async () => {
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;

            if (currentUser.uid !== postUser.uid) {
                alert("Solo el propietario de la publicación puede marcarla como rescatada.");
                return;
            }

            if (!postId) {
                throw new Error("postId is undefined");
            }

            const postRef = doc(db, 'posts', postId);
            await updateDoc(postRef, { rescatado: true });
            setIsRescatado(true);
            console.log(`Post marcado como rescatado: ${title}`);
            alert(`Has marcado el post como rescatado: ${title}`);

            if (onRescatado) {
                onRescatado(postId);
            }
        } catch (error) {
            console.error("Error marcando el post como rescatado: ", error);
            alert(`Hubo un error marcando el post como rescatado: ${error.message}`);
        }
    };

    const handleReport = async () => {
        try {
            const postRef = doc(db, 'posts', postId);
            await updateDoc(postRef, { report: true });
            console.log(`Post reportado: ${title}`);
            alert(`Has reportado el post: ${title}`);
            setReportModalOpen(false);
        } catch (error) {
            console.error("Error reportando el post: ", error);
            alert(`Hubo un error reportando el post: ${error.message}`);
        }
    };

    const handleCloseCommentModal = () => {
        setCommentModalOpen(false);
    };

    const handleCloseReportModal = () => {
        setReportModalOpen(false);
    };

    const getShareUrl = () => {
        return `${window.location.origin}/post/${title}`;
    };

    return (
        <div className={`${styles.post} ${isRescatado ? styles.rescatado : ''}`}>
            <div className={styles.userInfo}>
                <img 
                    src={postUser?.photoURL || userProfileImage} 
                    alt="User" 
                    className={styles.userImage} 
                />
                <span className={styles.userName}>
                    {postUser?.displayName || "Usuario Desconocido"} ({postUser?.email || "No disponible"})
                </span>
            </div>
            <h3 className={styles.postTitle}>{title}</h3>
            <p className={styles.postText}>{content}</p>
            {image && <img src={image} alt="Post" className={styles.postImage} />}
            {location && (
                <LoadScript googleMapsApiKey="AIzaSyAnSaqz9spQkLdo29ti0Kg9DchTch1-m74">
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
                <Button className={styles.actionButton} onClick={() => setCommentModalOpen(true)}>Comentar</Button>
                <Popover content={<QRCode value={getShareUrl()} bordered={false} />}>
                    <Button className={styles.actionButton} type="primary">Compartir</Button>
                </Popover>
                <Button className={styles.actionButton} onClick={() => setReportModalOpen(true)}>Reportar</Button>
                <Button className={styles.actionButton} onClick={handleRescatado} disabled={isRescatado}>
                    {isRescatado ? "Rescatado" : "Marcar como Rescatado"}
                </Button>
            </div>
            {commentModalOpen && (
                <div className={styles.commentModal}>
                    <TextField
                        label="Comentario"
                        multiline
                        rows={4}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        maxRows={4}
                    />
                    <div>
                        <Button onClick={handleCommentSubmit} variant="contained" color="primary">Subir</Button>
                        <Button onClick={handleCloseCommentModal} variant="outlined" color="secondary">Cancelar</Button>
                    </div>
                </div>
            )}
            <Reportar
                open={reportModalOpen}
                onClose={handleCloseReportModal}
                title={title}
                handleReport={handleReport}
            />
            <div className={styles.commentsSection}>
                {comments.map((c, index) => (
                    <div key={index} className={styles.comment}>
                        <strong>{c.userName}</strong>: {c.text}
                        <span className={styles.commentDate}>{new Date(c.timestamp).toLocaleString()}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Post;
