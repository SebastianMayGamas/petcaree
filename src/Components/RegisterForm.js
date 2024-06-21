import styles from './ResisterForm.module.css';
import React, { useState } from 'react';
import dogmeo from '../imagenes/cat-71494_1280.jpg';
import { Link } from "react-router-dom";
import { auth } from "../configuredatabase"; // Asegúrate de que la ruta es correcta
import { createUserWithEmailAndPassword } from "firebase/auth";

const RegisterForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("Usuario registrado con éxito");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className={styles.half}>
            <div className={styles.contents}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.colMd7}>
                            <h3>Regístrate en <strong>PETCARE</strong></h3>
                            <p className={styles.mb4}>Completa tus datos para crear una cuenta</p>
                            {error && <p className={styles.error}>{error}</p>}
                            <form onSubmit={handleSubmit}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="firstName">Nombre</label>
                                    <input
                                        type="text"
                                        className={styles.formControl}
                                        placeholder="Tu nombre"
                                        id="firstName"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="lastName">Apellido</label>
                                    <input
                                        type="text"
                                        className={styles.formControl}
                                        placeholder="Tu apellido"
                                        id="lastName"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="email">Correo</label>
                                    <input
                                        type="email"
                                        className={styles.formControl}
                                        placeholder="Tu_correo@gmail.com"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="password">Contraseña</label>
                                    <input
                                        type="password"
                                        className={styles.formControl}
                                        placeholder="Tu contraseña"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                                    <input
                                        type="password"
                                        className={styles.formControl}
                                        placeholder="Confirma tu contraseña"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <input type="submit" value="Registrarse" className={styles.btn} />
                            </form>
                            <div className={styles.loginLink}>
                                <p>¿Ya tienes una cuenta?</p>
                                <Link to="/home" className={styles.btn2}>Inicia sesión</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.bg} style={{ backgroundImage: `url(${dogmeo})` }}></div>
        </div>
    );
};

export default RegisterForm;

