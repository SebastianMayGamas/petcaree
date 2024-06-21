import React, { useState, useEffect } from 'react';
import styles from './ProfileDueno.module.css'; // Asegúrate de que este archivo exista y esté correctamente ubicado
import { useParams } from 'react-router-dom';

const ProfileDueno = () => {
  const [cliente, setCliente] = useState(null);
  const { id } = useParams(); // Destructuración directa para obtener 'id'

  useEffect(() => {
    const URI = `http://localhost:8000/dueno/${id}`; // Uso de template literals para incluir el id
    fetch(URI)
      .then(response => response.json())
      .then(data => setCliente(data))
      .catch(error => console.error('Error al cargar', error));
  }, [id]);

  return (
    <div className={styles.profileDueno}> {/* Asegúrate de que 'profileDueno' exista en tu archivo CSS */}
      {cliente ? (
        <div>
          <p><strong>Nombre:</strong> {cliente.nombre} {cliente.apellidos}</p>
          <div>
            <p>Ubicación Registrada</p>
            <ul>
              <li><strong>País:</strong> {cliente.pais}</li>
              <li><strong>Estado:</strong> {cliente.estado}</li>
              <li><strong>Municipio:</strong> {cliente.municipio}</li>
              <li><strong>Ciudad:</strong> {cliente.ciudad}</li>
              <li><strong>Calle:</strong> {cliente.calle}</li>
              <li><strong>Número de casa:</strong> {cliente.numeroCasa}</li>
            </ul>
          </div>
        </div>
      ) : (
        <p>Cargando información del dueño...</p>
      )}
    </div>
  );
};

export default ProfileDueno;
