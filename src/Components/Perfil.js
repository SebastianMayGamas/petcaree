import React,{useState, useEffect} from 'react'
import styles from './Perfil.module.css'
import NavBar from "./NavBar";
import {getAuth} from "firebase/auth";

const Perfil = () => {

  const [name, setName] = useState('null');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setEmail(user.email);
      setName(user.displayName);
    }
  }, []);

  return (

    <div>
      <NavBar />
      Perfil
      <div>
        <label>{name}</label>
      </div>
      <div>
        <label>{email}</label>
      </div>


    </div>
  )
}

export default Perfil