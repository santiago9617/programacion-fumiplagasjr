import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';


const OrangeButton = () => {

  const navigate = useNavigate();
  const { logout } = useAuth();



  const handleLogout = async () => {
    try {
      navigate('/')
      await logout(); 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center fixed bottom-4 left-4 z-10">
      <Link to="/home">
        <button className="bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg mb-4 hover:from-orange-500 hover:to-orange-700 hover:shadow-xl transition duration-300">
          Clientes
        </button>
      </Link>
      <Link to="/programacion">
        <button className="bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg mb-4 hover:from-orange-500 hover:to-orange-700 hover:shadow-xl transition duration-300">
          Programación
        </button>
      </Link>
      <Link to="/tarea">
        <button className="bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg mb-4 hover:from-orange-500 hover:to-orange-700 hover:shadow-xl transition duration-300">
          Tareas
        </button>
      </Link>
      <button
        onClick={handleLogout}
        className="bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:from-orange-500 hover:to-orange-700 hover:shadow-xl transition duration-300"
      >
        Salir
      </button>
    </div>
  );
};

export default OrangeButton;
