import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';
import OrangeButton from './OrangeButton';
import Buscar from './Buscar';

function Home() {
    const [currentPage, setCurrentPage] = useState(1);
    const [todosLosServicios, setTodosLosServicios] = useState([]);
    const [todosLosServiciosOriginales, setTodosLosServiciosOriginales] = useState([]);
    const [showOrangeButton, setShowOrangeButton] = useState(false);
    const itemsPerPage = 10; // Cambia este valor según tu preferencia

    const toggleOrangeButton = () => {
        setShowOrangeButton(!showOrangeButton);
    };

    // Función para obtener los datos de Firebase para una página específica
    const fetchData = async (page) => {
        try {
            const offset = (page - 1) * itemsPerPage;
            const serviciosSnapshot = await getDocs(collection(firestore, 'servicios'));
            const serviciosData = serviciosSnapshot.docs.map(doc => doc.data()).slice(offset, offset + itemsPerPage);
            setTodosLosServicios(serviciosData);
            setTodosLosServiciosOriginales(serviciosData);
        } catch (error) {
            console.error('Error al obtener los servicios:', error);
        }
    };

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const handleSearch = (searchTerm) => {
        const searchTermLowercase = searchTerm.toLowerCase();
        const serviciosFiltrados = todosLosServiciosOriginales.filter(servicio => {
            const nombreClienteLowercase = servicio.nombreCliente.toLowerCase();
            const direccionClienteLowercase = servicio.direccionCliente.toLowerCase();
            return nombreClienteLowercase.includes(searchTermLowercase) || direccionClienteLowercase.includes(searchTermLowercase);
        });
        setTodosLosServicios(serviciosFiltrados);
    };

    const handleReset = () => {
        setTodosLosServicios(todosLosServiciosOriginales);
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
                <Buscar onSearch={handleSearch} onReset={handleReset} />
            </div>
            <div className="overflow-x-auto mt-4">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre Cliente</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Barrio/Municipio</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
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
                                <td className="px-6 py-4 whitespace-normal text-lg text-gray-900 border">{servicio.nombreCliente}</td>
                                <td className="px-6 py-4 whitespace-normal text-lg text-gray-900 border">{servicio.direccionCliente}</td>
                                <td className="px-6 py-4 whitespace-normal text-lg text-gray-900 border">{servicio.barrioMunicipio}</td>
                                <td className="px-6 py-4 whitespace-normal text-lg text-gray-900 border">{servicio.telefono}</td>
                                <td className="px-6 py-4 whitespace-normal text-lg text-gray-900 border">{servicio.tipoPlaga}</td>
                                <td className="px-6 py-4 whitespace-normal text-lg text-gray-900 border">{servicio.fecha}</td>
                                <td className="px-6 py-4 whitespace-normal text-lg text-gray-900 border">{servicio.hora}</td>
                                <td className="px-6 py-4 whitespace-normal text-lg text-gray-900 border">{servicio.tecnico}</td>
                                <td className="px-6 py-4 whitespace-normal text-lg text-gray-900 border">{servicio.precio}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
                    disabled={currentPage === 1}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                >
                    Anterior
                </button>
                <button
                    onClick={() => setCurrentPage(prevPage => prevPage + 1)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}

export default Home;
