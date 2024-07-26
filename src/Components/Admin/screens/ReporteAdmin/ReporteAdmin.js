import React, { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'; // Importa Firestore
import { db } from '../../../../configuredatabase'; // Importa la configuración de Firestore
import NavbarAdmin from '../NavbarAdmin/NavbarAdmin';
import PostReport from './PostReport/PostReport';

function ReporteAdmin() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const q = query(
                    collection(db, 'posts'),
                    where('report', '==', true), // Filtrar posts reportados
                    orderBy('createdAt', 'desc') // Ordenar por fecha de creación descendente
                );
                console.log('Query creada:', q);

                const querySnapshot = await getDocs(q);
                console.log('QuerySnapshot:', querySnapshot);

                const postsArray = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log('Posts obtenidos:', postsArray); // Verifica que los datos se obtienen correctamente

                setPosts(postsArray);
            } catch (error) {
                console.error('Error obteniendo los posts: ', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div>
            <NavbarAdmin />
            <div>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <PostReport
                            key={post.id}
                            user={post.user}
                            title={post.title}
                            content={post.content}
                            image={post.image}
                            location={post.location}
                            postId={post.id}
                        />
                    ))
                ) : (
                    <p>No hay posts reportados.</p>
                )}
            </div>
        </div>
    );
}

export default ReporteAdmin;