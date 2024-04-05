import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import { AuthProvider } from './context/authContext';
import Register from './components/Register';
import ProtectedRouter from './components/ProtectedRoute';
import Tareas from './components/Tareas';
import Programacion from './components/Programacion';
import Programacion1 from './components/Programacion1';
import Programacion2 from './components/Programacion2';
import Programacion3 from './components/Programacion3';


function App() {
  return (
    <div className="bg-slate-300 h-screen text-black flex">
      <AuthProvider>
        <Routes>
          
          <Route path="/" element={<LoginForm />} />
          <Route
            path="/home"
            element={
              <ProtectedRouter>
                <Home />
              </ProtectedRouter>
            }
          />
          <Route path='/programacionTres' element={<Programacion3/>}></Route>
          <Route path='/programacionDos' element={<Programacion2/>} />
          <Route path="/tarea" element={<Tareas />} />
          <Route path="/programacionUno" element={<Programacion1 />} />
          <Route path="/programacion" element={<Programacion />} />
          <Route path="/register" element={<Register />} />
          
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
