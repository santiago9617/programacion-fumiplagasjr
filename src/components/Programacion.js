import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OrangeButton from './OrangeButton';

const Programacion = () => {
  const [showOrangeButton, setShowOrangeButton] = useState(false);
  
  const toggleOrangeButton = () => {
    setShowOrangeButton(!showOrangeButton);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold mb-8">Programación</h1>
      <div className="flex flex-wrap justify-center">
        <Link to="/programacion-fumiplagasjr/programacionUno">
          <button 
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-12 px-24 rounded-lg text-3xl shadow-md m-4"
          >
            Jhon Mario
          </button>
        </Link>
        <Link to='/programacion-fumiplagasjr/programacionDos'> 
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-12 px-24 rounded-lg text-3xl shadow-md m-4"
          >
            Sergio
          </button>
        </Link>
        <Link to='/programacion-fumiplagasjr/programacionTres'> 
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-12 px-24 rounded-lg text-3xl shadow-md m-4"
            onClick={() => console.log('Santiago')}
          >
            Santiago
          </button>
        </Link>
      </div>
      <div className="absolute top-4">
        <button onClick={toggleOrangeButton} className="rounded-full bg-orange-500 p-4 focus:outline-none">
          <svg className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        </button>
      </div>
      {showOrangeButton && <OrangeButton />}
    </div>
  );
};

export default Programacion;
