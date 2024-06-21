import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';
import DuenoForm from './Components/DuenoForm';
import Perfil from './Components/Perfil';
import ExpertoForm from './Components/ExpertoForm';
import ProfileDueno from './Components/ProfileDueno';
import ProfileExpert from './Components/ProfileExpert';
import Ayuda from './Components/Ayuda';
import Mapa from './Components/Mapa';


function App() {
  return (
      <Router>
        <div>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/registroDueno/:id" element={<DuenoForm />} />
            <Route path='/perfil/:id' element={<Perfil />} />
            <Route path='/registroexpert/:id' element={<ExpertoForm />} />
            <Route path='/perfilDueno/:id' element={<ProfileDueno />} />
            <Route path='/perfilExpert/:id' element={<ProfileExpert />} />
            <Route path="/ayuda" element={<Ayuda />} />
            <Route path="/Mapa" element={<Mapa />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;

