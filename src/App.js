// App.js
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
import MapPage from './Components/MapPage';
import PublicarPopup from './Components/PublicarPopup'; // Asegúrate de importar el componente de búsqueda
import SearchResults from './Components/SearchResults'; // Nuevo componente para resultados de búsqueda
import ProtectedRoute from './ProtectedRoute'; // Importar ProtectedRoute
import { AuthProvider } from './AuthContext'; // Importar AuthProvider
import UsersAdmin from './Components/Admin/screens/UsersAdmin/UsersAdmin';
import ReporteAdmin from './Components/Admin/screens/ReporteAdmin/ReporteAdmin';
import Anuncios from "./Components/Admin/screens/Anuncios/Anuncios";
import Publicidad from './Components/Publicidad';

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
            <Route path="/mapa" element={<ProtectedRoute><MapPage /></ProtectedRoute>} />
            <Route path="/publicar" element={<ProtectedRoute><PublicarPopup /></ProtectedRoute>} />
            <Route path="/buscar" element={<ProtectedRoute><SearchResults /></ProtectedRoute>} />
            <Route path='/admin/useradmin' element={<ProtectedRoute> <UsersAdmin /> </ProtectedRoute>} />
            <Route path= '/admin/reportes' element={<ProtectedRoute><ReporteAdmin /> </ProtectedRoute>} />
            <Route path= '/admin/anuncio' element={<ProtectedRoute><Anuncios/></ProtectedRoute>}/>
            <Route path="/publicidad/" element={<ProtectedRoute><Publicidad /></ProtectedRoute>} />
          </Routes>
        </AuthProvider>
      </Router>
  );
}

export default App;
