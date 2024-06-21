import React, { useEffect, useState } from 'react'
import styles from './DuenoForm.module.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const DuenoForm = () => {
    const [nombre, setNombre]= useState('');
    const [apellidos, setApellidos]= useState('');
    const [numeroTelefonico, setNumeroTelefonico]= useState('');
    const [pais, setPais]= useState('');
    const [estado, setEstado]= useState('');
    const [municipio, setMunicipio]= useState('');
    const [ciudad, setCiudad]= useState('');
    const [calle, setCalle]= useState('')
    const [numeroCasa, setNumeroCasa]= useState('');
    let { id } = useParams();
    const [id_usuario , setIdUser] = useState('')
    let navigate = useNavigate();

    useEffect(() =>{
      setIdUser(id);
    },[id]);

    const handleSubmit = (e) =>{
        e.preventDefault();
          // Recopilar los datos del formulario
    const datosDueno = {
      id_usuario,
      nombre,
      apellidos,
      numeroTelefonico,
      pais,
      estado,
      municipio,
      ciudad,
      calle,
      numeroCasa
  };

  // Llamar a la función para registrar al dueño con los datos recopilados
  registroDueno(datosDueno);

    }

    const registroDueno = (datosDueno) => {
      const URI = 'http://localhost:8000/createdueno';
      fetch(URI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosDueno),
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
            navigate(`/perfilDueno/${data.id}`);
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
    <div className={styles.duenoContainer}>
     
     <form onSubmit={handleSubmit} className={styles.duenoForm}>
    <h1>Registro de dueño</h1>

   <div className={styles.inputGroup}>
   <label htmlFor="nombre">Nombre:</label>
    <input
      id="nombre"
      type="text"
      value={nombre}
      onChange={(e) => setNombre(e.target.value)}
    />
   </div>

    <div  className={styles.inputGroup}>
    <label htmlFor="apellido">Apellido:</label>
    <input
      id="apellido"
      type="text"
      value={apellidos}
      onChange={(e) => setApellidos(e.target.value)}
    />
    </div>

    <div  className={styles.inputGroup}>
    <label htmlFor="numeroTelefonico">Número Telefónico:</label>
    <input
      id="numeroTelefonico"
      type="tel"
      value={numeroTelefonico}
      onChange={(e) => setNumeroTelefonico(e.target.value)}
    />
    </div>

    <div  className={styles.inputGroup}>
    <label htmlFor='pais'>Pais</label>
    <input
    id='pais'
    type='text'
    value={pais}
    onChange={(e)=> setPais (e.target.value)}
    />
    </div>

    <div  className={styles.inputGroup}>
    <label htmlFor='estado'>Estado</label>
    <input
    id='estado'
    type='text'
    value={estado}
    onChange={(e)=> setEstado(e.target.value)}
    />
    </div>

    <div  className={styles.inputGroup}>
    <label htmlFor='municipio'> municipio</label>
    <input
    id='municipio'
    type='text'
    value={municipio}
    onChange={(e)=> setMunicipio(e.target.value)}
    />
    </div>

    <div  className={styles.inputGroup}>
    <label htmlFor='ciudad'> Ciudad</label>
    <input
    id='ciudad'
    type='text'
    value={ciudad}
    onChange={(e)=> setCiudad(e.target.value)}
    />
    </div>

    <div  className={styles.inputGroup}>
    <label htmlFor='calle'>Calle</label>
    <input
    id='calle'
    type='text'
    value={calle}
    onChange={(e)=> setCalle(e.target.value)}
    />
    </div>

    <div  className={styles.inputGroup}>
    <label htmlFor='numerCasa'>Numero de casa</label>
    <input
    id='numeroCasa'
    type='number'
    value={numeroCasa}
    onChange={(e)=> setNumeroCasa (e.target.value)}
    />
    </div>

    <button type='submit' className={styles.duenobutton}> Guardar </button>
</form>
</div>

    </div>
  )
}

export default DuenoForm