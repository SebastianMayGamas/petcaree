import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Asegúrate de importar los estilos del carrusel
import styles from './styles/Eventos.module.css';
import imagenLogo from '../imagenes/logo.png';
import imageneventito from '../imagenes/eventito.jpeg';
import imageneventwo from '../imagenes/eventotwo.jpeg';


const Eventos = () => {
  const eventos = [
    { id: 1, text: 'Evento 1', img: imagenLogo },
    { id: 2, text: 'Evento 2', img: imageneventito },
    { id: 3, text: 'Evento 3', img: imageneventwo },
  ];

  const anuncios = [
    { id: 1, text: 'Anuncio 1', img: imagenLogo },
    { id: 2, text: 'Anuncio 2', img: imagenLogo },
    { id: 3, text: 'Anuncio 3', img: imagenLogo },
  ];

  return (
    <nav className={styles.eventos}>
      <div className={styles.carouselContainer}>
        <p className={styles.adTitule}>Eventos</p>
        <Carousel 
          showThumbs={false} 
          autoPlay 
          interval={3000} 
          infiniteLoop 
          showStatus={false}
          swipeable
          emulateTouch
          dynamicHeight
          className={styles.carousel}
          centerMode
          centerSlidePercentage={100} // Asegura que solo se muestra un elemento a la vez
        >
          {eventos.map((item) => (
            <div key={item.id} className={styles.adContainer1}>
              <img src={item.img} alt="Logo" className={styles.logo} />
              <p className={styles.adText1}>{item.text}</p>
            </div>
          ))}
        </Carousel>
      </div>
      <div className={styles.carouselContainer}>
        <p className={styles.adTitule}>Anuncios</p>
        <Carousel 
          showThumbs={false} 
          autoPlay 
          interval={3000} 
          infiniteLoop 
          showStatus={false}
          swipeable
          emulateTouch
          dynamicHeight
          className={styles.carousel}
          centerMode
          centerSlidePercentage={100} // Asegura que solo se muestra un elemento a la vez
        >
          {anuncios.map((item) => (
            <div key={item.id} className={styles.adContainer1}>
              <img src={item.img} alt="Logo" className={styles.logo} />
              <p className={styles.adText1}>{item.text}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </nav>
  );
};

export default Eventos;