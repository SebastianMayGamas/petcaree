import React from 'react';
import NavBar from './NavBar';
import styles from './Ayuda.module.css'; // Importa el archivo de estilos CSS

function Ayuda() {
  return (
    <div className={styles.ayudaPage}>
      <NavBar />
      <h1>Centro de Ayuda</h1>
      <p>Encuentra respuestas a tus preguntas frecuentes aquí.</p>
      <div className={styles.preguntasFrecuentes}>
        <h2>Preguntas Frecuentes</h2>
        <div className={styles.pregunta}>
          <h3>¿Cómo puedo restablecer mi contraseña?</h3>
          <p>Para restablecer tu contraseña, ve a la página de inicio de sesión y haz clic en "¿Olvidaste tu contraseña?". Sigue las instrucciones para restablecer tu contraseña.</p>
        </div>
        <div className={styles.pregunta}>
          <h3>¿Cómo puedo cambiar mi información personal?</h3>
          <p>Para cambiar tu información personal, ve a tu perfil y haz clic en "Editar perfil". Realiza los cambios necesarios y guarda la información actualizada.</p>
        </div>
        <div className={styles.pregunta}>
          <h3>¿Cómo puedo contactar al servicio de atención al cliente?</h3>
          <p>Puedes contactar al servicio de atención al cliente a través del formulario de contacto en nuestra página web o enviando un correo electrónico a support@example.com.</p>
        </div>
      </div>
      <div className={styles.contactanos}>
        <h2>¿Todavía necesitas ayuda?</h2>
        <p>¡No te preocupes! Contáctanos y estaremos encantados de ayudarte.</p>
        <a href="/contacto" className={styles.contactanosButton}>Contáctanos</a>
      </div>
    </div>
  );
}

export default Ayuda;
