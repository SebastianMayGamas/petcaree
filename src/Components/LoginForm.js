import React from 'react';
import styles from './LoginForm.module.css';
import catcute from '../imagenes/catcute.jpg';
import {Link} from "react-router-dom";

const LoginForm = () => {
  return (
      <div className={styles.half}>
        <div className={styles.bg} style={{backgroundImage: `url(${catcute})`}}></div>
        <div className={styles.contents}>
          <div className={styles.container}>
            <div className={styles.row}>
              <div className={styles.colMd7}>
                <h3>Login to <strong>PETCARE</strong></h3>
                <p className={styles.mb4}>Ingresa tus datos de inicio</p>
                <form action="#" method="post">
                  <div className={styles.formGroup}>
                    <label htmlFor="username">Email</label>
                    <input type="text" className={styles.formControl} placeholder="Tu_correo@gmail.com" id="username"/>
                  </div>
                  <div className={`${styles.formGroup} ${styles.mb3}`}>
                    <label htmlFor="password">Password</label>
                    <input type="password" className={styles.formControl} placeholder="Tu contraseña" id="password"/>
                  </div>
                  <div className={`${styles.dFlex} ${styles.mb5}`}>
                    <label className={`${styles.control} ${styles.controlCheckbox}`}>
                      <span className={styles.caption}>Recuerdame</span>
                      <input type="checkbox" defaultChecked/>
                      <div className={styles.controlIndicator}></div>
                    </label>
                    <span className={styles.mlAuto}><a href="#" className={styles.forgotPass}>¿Olvidaste la contraseña?</a></span>
                  </div>
                  <input type="submit" value="Ingresar" className={styles.btn}/>
                </form>
                <div className={styles.registerLink}>
                  <p>¿No tienes una cuenta?</p>
                  <button className={styles.btn2}><Link to="/register">Registrar</Link></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default LoginForm;

