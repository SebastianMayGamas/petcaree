import React, { useState } from 'react';
import NavBar from "./NavBar";
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../configuredatabase';

const Publicidad = () => {
  const [formData, setFormData] = useState({
    subject: '',
    company: '',
    phoneNumber: '',
    document: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Agrega datos al Firestore
      const docRef = await addDoc(collection(db, 'interested_users'), {
        subject: formData.subject,
        company: formData.company,
        phoneNumber: formData.phoneNumber,
        document: formData.document ? formData.document.name : null, // Solo nombre del archivo
      });

      console.log('Documento escrito con ID: ', docRef.id);
      alert('Formulario enviado con éxito');
      // Restablecer formulario
      setFormData({
        subject: '',
        company: '',
        phoneNumber: '',
        document: null,
      });
    } catch (e) {
      console.error('Error añadiendo documento: ', e);
      alert('Error al enviar el formulario');
    }
  };

  return (
    <div>
    <NavBar/>
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>¡Haz Crecer Tu Negocio con Nosotros!</h1>
        <img
          src="https://example.com/tu-imagen-publicitaria.jpg" // Reemplaza con tu imagen
          alt="Publicidad"
          style={styles.image}
        />
      </div>

      <div style={styles.content}>
        <h2 style={styles.sectionTitle}>¿Por qué Publicitar con Nosotros?</h2>
        <p style={styles.text}>
          Al asociarte con nosotros, podrás llegar a una audiencia amplia y comprometida.
          Ofrecemos opciones de publicidad flexibles que se adaptan a tus necesidades.
        </p>

        <h2 style={styles.sectionTitle}>Opciones de Publicidad</h2>
        <p style={styles.text}>
          - <strong>Anuncios en la Página Principal:</strong> Coloca tu anuncio en un lugar destacado para mayor visibilidad.
        </p>
        <p style={styles.text}>
          - <strong>Publicaciones Patrocinadas:</strong> Resalta tu producto o servicio en nuestras publicaciones.
        </p>
        <p style={styles.text}>
          - <strong>Banners y Ofertas Especiales:</strong> Diseñamos banners y promociones personalizadas.
        </p>

        <h2 style={styles.sectionTitle}>¿Cómo Funciona?</h2>
        <p style={styles.text}>
          1. <strong>Contacta con Nosotros:</strong> Envíanos un correo a <a href="mailto:correo@tupagina.com">petcareco@gmail.com</a> para discutir tus necesidades.
          <br />
          2. <strong>Personaliza Tu Paquete:</strong> Elegimos juntos el mejor paquete para tu negocio.
          <br />
          3. <strong>Lanza Tu Publicidad:</strong> Tu campaña comenzará a atraer a nuevos clientes.
        </p>

        <h2 style={styles.sectionTitle}>Contáctanos</h2>
        <p style={styles.text}>
          Estamos aquí para ayudarte a alcanzar tus objetivos de marketing. No dudes en contactarnos para más información.
        </p>

        <h2 style={styles.sectionTitle}>Formulario de Interés</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="subject">Asunto</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="company">Compañía</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="phoneNumber">Número de Teléfono</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="document">Adjuntar Documento</label>
            <input
              type="file"
              id="document"
              name="document"
              onChange={handleChange}
              style={styles.fileInput}
            />
          </div>

          <button type="submit" style={styles.submitButton}>Enviar</button>
        </form>
      </div>
    </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    width: '80%',
    maxWidth: '800px',
    margin: '20px auto',
    boxShadow: '0 4px 8px rgba(128, 0, 128, 0.3)', // Sombra morada
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#6a0dad', // Color morado
    marginBottom: '10px',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  content: {
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#6a0dad', // Color morado
    marginBottom: '10px',
  },
  text: {
    fontSize: '16px',
    color: '#333',
    marginBottom: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  fileInput: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  submitButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#6a0dad', // Color morado
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Publicidad;
