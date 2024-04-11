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
import Programacion4 from './components/Programacion4';


function App() {
  return (
    <div className="bg-slate-300 h-screen text-black flex">
      <AuthProvider>
        <Routes>
          <Route path="/programacion-fumiplagasjr/" element={<LoginForm />} />
          <Route
            path="/programacion-fumiplagasjr/home"
            element={
              <ProtectedRouter>
                <Home />
              </ProtectedRouter>
            }
          />
          <Route path="/programacion-fumiplagasjr/programacionTres" element={<Programacion3/>} />
          <Route path="/programacion-fumiplagasjr/programacionDos" element={<Programacion2/>} />
          <Route path="/programacion-fumiplagasjr/programacionCuatro" element={<Programacion4/>} />
          <Route path="/programacion-fumiplagasjr/tarea" element={<Tareas />} />
          <Route path="/programacion-fumiplagasjr/programacionUno" element={<Programacion1 />} />
          <Route path="/programacion-fumiplagasjr/programacion" element={<Programacion />} />
          <Route path="/programacion-fumiplagasjr/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
