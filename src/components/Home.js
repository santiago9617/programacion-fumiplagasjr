import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';
import OrangeButton from './OrangeButton';
import Buscar from './Buscar';


function Home() {
  
    const [todosLosServicios, setTodosLosServicios] = useState([]);
    const [todosLosServiciosOriginales, setTodosLosServiciosOriginales] = useState([]);
    const [showOrangeButton, setShowOrangeButton] = useState(false);
    

    const toggleOrangeButton = () => {
        setShowOrangeButton(!showOrangeButton);
    };

    useEffect(() => {
        async function fetchData() {
            const serviciosSergioSnapshot = await getDocs(collection(firestore, 'serviciosSergio'));
            const serviciosSergioData = serviciosSergioSnapshot.docs.map(doc => doc.data());

            const serviciosSantySnapshot = await getDocs(collection(firestore, 'serviciosSanty'));
            const serviciosSantyData = serviciosSantySnapshot.docs.map(doc => doc.data());

            const serviciosSnapshot = await getDocs(collection(firestore, 'servicios'));
            const serviciosData = serviciosSnapshot.docs.map(doc => doc.data());

            const todosLosServiciosData = [...serviciosSergioData, ...serviciosSantyData, ...serviciosData];

            setTodosLosServicios(todosLosServiciosData);

            setTodosLosServicios(todosLosServiciosData);
            setTodosLosServiciosOriginales(todosLosServiciosData);

        }

        fetchData();
    }, []);

    useEffect(() => {
      async function fetchData() {
          try {
              const serviciosSergioSnapshot = await getDocs(collection(firestore, 'serviciosSergio'));
              const serviciosSergioData = serviciosSergioSnapshot.docs.map(doc => doc.data());
  
              const serviciosSantySnapshot = await getDocs(collection(firestore, 'serviciosSanty'));
              const serviciosSantyData = serviciosSantySnapshot.docs.map(doc => doc.data());
  
              const serviciosSnapshot = await getDocs(collection(firestore, 'servicios'));
              const serviciosData = serviciosSnapshot.docs.map(doc => doc.data());
  
              const todosLosServiciosData = [...serviciosSergioData, ...serviciosSantyData, ...serviciosData];
  
              setTodosLosServicios(todosLosServiciosData);
  
          } catch (error) {
              console.error('Error al obtener los servicios:', error);
              
          }
      }
  
      fetchData();
  }, []);
  

    const handleSearch = (searchTerm) => {
      // Convertir el término de búsqueda a minúsculas para una comparación sin distinción entre mayúsculas y minúsculas
      const searchTermLowercase = searchTerm.toLowerCase();
  
      // Filtrar los servicios según el término de búsqueda
      const serviciosFiltrados = todosLosServicios.filter(servicio => {
          // Convertir el nombre del cliente y la dirección del cliente a minúsculas para comparación
          const nombreClienteLowercase = servicio.nombreCliente.toLowerCase();
          const direccionClienteLowercase = servicio.direccionCliente.toLowerCase();
  
          // Comprobar si el término de búsqueda coincide con el nombre del cliente o la dirección del cliente
          return nombreClienteLowercase.includes(searchTermLowercase) || direccionClienteLowercase.includes(searchTermLowercase);
      });
  
      // Actualizar el estado de los servicios filtrados
      setTodosLosServicios(serviciosFiltrados);
  };
  
  const handleReset = () => {
    setTodosLosServicios(todosLosServiciosOriginales); // Restablecer los datos originales
};
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Clientes</h1>
            <div className="flex items-center">
            <button onClick={toggleOrangeButton} className="rounded-full bg-orange-500 p-4 focus:outline-none mr-4">
                <svg className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
            </button>
            {showOrangeButton && <OrangeButton />}
            <Buscar onSearch={handleSearch}  onReset={handleReset} />
            </div>
            <div className="overflow-x-auto mt-4"></div>
            <div className="overflow-x-auto mt-4">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre Cliente</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Barrio/Municipio</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Observaciones</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo de Plaga</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Hora</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Técnico</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todosLosServicios.map((servicio, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{servicio.nombreCliente}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{servicio.direccionCliente}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{servicio.barrioMunicipio}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{servicio.telefono}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{servicio.observaciones}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{servicio.tipoPlaga}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{servicio.fecha}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{servicio.hora}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{servicio.tecnico}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{servicio.precio}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;