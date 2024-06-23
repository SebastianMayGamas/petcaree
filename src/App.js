// src/App.js
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
import ProtectedRoute from './ProtectedRoute'; // Importar ProtectedRoute
import { AuthProvider } from './AuthContext'; // Importar AuthProvider

function App() {
  return (
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/registroDueno/:id" element={<ProtectedRoute><DuenoForm /></ProtectedRoute>} />
            <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
            <Route path="/registroexpert/:id" element={<ProtectedRoute><ExpertoForm /></ProtectedRoute>} />
            <Route path="/perfilDueno/:id" element={<ProtectedRoute><ProfileDueno /></ProtectedRoute>} />
            <Route path="/perfilExpert/:id" element={<ProtectedRoute><ProfileExpert /></ProtectedRoute>} />
            <Route path="/ayuda" element={<ProtectedRoute><Ayuda /></ProtectedRoute>} />
            <Route path="/Mapa" element={<ProtectedRoute><Mapa /></ProtectedRoute>} />
          </Routes>
        </AuthProvider>
      </Router>
  );
}

export default App;

