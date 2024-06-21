import styles from './ExpertoForm.module.css'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';


const ExpertoForm = () => {
    const [id_usuario, setIdUsuario] = useState('')
    const [nombre, setNombre]= useState('')
    const [apellido, setApellido] = useState('')
    const [cedula, setCedula]= useState('')
    const [telefonoProfecional, setTelefonoProfecional]= useState('')
    let navigate = useNavigate();
    let { id } = useParams();

    useEffect(() =>{
        setIdUsuario(id);
      },[id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const datosExperto = {
            id_usuario,
            nombre,
            apellido,
            cedula,
            telefonoProfecional
        };

        const URI = 'http://localhost:8000/createexpert';

        fetch(URI, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosExperto),
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Error en la petición');
              }
              return response.json(); // Parse the response as JSON
            })
            .then(data => {
              console.log('Datos recibidos:', data);
              if (data && data.id) {
                console.log('Registro exitoso. ID:', data.id);
                navigate(`/perfilExpert/${data.id}`);
              } else {
                console.error('No se recibió la ID correctamente');
              }
            })
            .catch(error => {
              console.error('Error en la petición:', error.message);
            });
    };



  return (
    <div>
        <div className={styles.expertcontainer}>
            <form className={styles.expertForm} onSubmit={handleSubmit}>
                <h1>Registro de expertos</h1>
                <div className={styles.inputGroup}>
                    <label htmlFor='nombre'>Nombre</label>
                    <input
                    id='nombre'
                    type='text'
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor='apellido'>Apellido</label>
                    <input
                    id='apellido'
                    type='text'
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor='cedula'>cedula profecional (Opcional)</label>
                    <input
                    id='cedula'
                    type='text'
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor='numeroProfecional'>Numero Profecional</label>
                    <input
                    id='numeroProfecional'
                    type='tel'
                    value={telefonoProfecional}
                    onChange={(e) => setTelefonoProfecional(e.target.value)}
                    />
                <button type='submit' className={styles.expertbutton}>Guardar</button> 

                </div>

            </form>
        </div>
    </div>
  )
}

export default ExpertoForm