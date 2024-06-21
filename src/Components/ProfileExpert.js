import React, { useState, useEffect } from 'react'
import styles from './ProfileExpert.module.css'
import { useParams } from 'react-router-dom';

const ProfileExpert = () => {
    const [cliente, setCliente] = useState(null);
    const { id } = useParams(); // Destructuración directa para obtener 'id'
  
    useEffect(() => {
      const URI = `http://localhost:8000/experto/${id}`; // Uso de template literals para incluir el id
      fetch(URI)
        .then(response => response.json())
        .then(data => setCliente(data))
        .catch(error => console.error('Error al cargar', error));
    }, [id]);

  return (
    <div className={styles.profileDueno} >
     {cliente ? (
        <div>
          <p><strong>Nombre:</strong> {cliente.nombre} {cliente.apellidos}</p>
          <div>
            <p>informacion Registrada</p>
            <ul>
              <li><strong>Cedula:</strong> {cliente.cedula}</li>
              <li><strong>telefono Profecional:</strong> {cliente.telefonoProfecional}</li>
            </ul>
          </div>
        </div>
      ) : (
        <p>Cargando información del dueño...</p>
      )}
    </div>
  )
}

export default ProfileExpert