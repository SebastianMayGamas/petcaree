// SearchResults.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../configuredatabase';
import Post from './Post'; // Asegúrate de importar el componente Post
import NavBar from "./NavBar";

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryParam = searchParams.get('query');

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const q = query(collection(db, 'posts'), where('user.displayName', '==', queryParam));
        const querySnapshot = await getDocs(q);
        const results = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSearchResults(results);
      } catch (error) {
        console.error('Error al buscar usuarios:', error);
      }
    };

    fetchUserPosts();
  }, [queryParam]);

  return (
    <div>
      <NavBar />
      <h2>Resultados de búsqueda para "{queryParam}"</h2>
      {searchResults.length > 0 ? (
        searchResults.map(post => (
          <Post
            key={post.id}
            user={post.user}
            title={post.title}
            content={post.content}
            image={post.image}
            location={post.location}
          />
        ))
      ) : (
        <p>No se encontraron resultados.</p>
      )}
    </div>
  );
};

export default SearchResults;
