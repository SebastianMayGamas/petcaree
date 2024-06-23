import React, {useState} from 'react';
import styles from './LoginForm.module.css';
import catcute from '../imagenes/catcute.jpg';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../configuredatabase"; // Asegúrate de que la ruta es correcta

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try{
      await signInWithEmailAndPassword(auth,email, password);
      navigate('/home');
    } catch(err){
      setError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
      alert('Error al iniciar sesión. Por favor, verifica tus credenciales.');
    }

  };

  const handleRegister = () => {
    navigate('/register');
  };

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
                    <input type="text" className={styles.formControl} placeholder="Tu_correo@gmail.com" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className={`${styles.formGroup} ${styles.mb3}`}>
                    <label htmlFor="password">Password</label>
                    <input type="password" className={styles.formControl} placeholder="Tu contraseña" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <div className={`${styles.dFlex} ${styles.mb5}`}>
                    <label className={`${styles.control} ${styles.controlCheckbox}`}>
                      <span className={styles.caption}>Recuerdame</span>
                      <input type="checkbox" defaultChecked/>
                      <div className={styles.controlIndicator}></div>
                    </label>
                    <span className={styles.mlAuto}><a href="#" className={styles.forgotPass}>¿Olvidaste la contraseña?</a></span>
                  </div>
                  <button type="button" className={styles.btn} onClick={handleLogin}>Ingresar</button>
                </form>
                <div className={styles.registerLink}>
                  <p>¿No tienes una cuenta?</p>
                  <button type="button" className={styles.btn2} onClick={handleRegister}>Registrar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default LoginForm;


