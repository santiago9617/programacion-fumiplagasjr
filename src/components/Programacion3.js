import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';


const Programacion3 = () => {
    const navigate = useNavigate();
    const serviciosCollection = collection(firestore, 'serviciosSanty');

    const [serviciosProgramados, setServiciosProgramados] = useState({});
    const [cliente, setCliente] = useState({
        idCliente: '',
        nombreCliente: '',
        direccionCliente: '',
        barrioMunicipio: '',
        telefono: '',
        observaciones: '',
        tipoPlaga: '',
        fecha: '',
        hora: '',
        tecnico: 'Santiago',
        precio: '' 
    });
    const [showAlert, setShowAlert] = useState(false); // Estado para mostrar la alerta

    const handleChange = e => {
        const { name, value } = e.target;
        setCliente(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (cliente.nombreCliente.trim() === '') {
            // Mostrar la alerta si el campo Nombre Cliente está vacío
            setShowAlert(true);
            return;
        }

        try {
            const docRef = await addDoc(serviciosCollection, cliente);
            console.log('Documento guardado en Firestore con ID:', docRef.id);
            setCliente({
                idCliente: '',
                nombreCliente: '',
                direccionCliente: '',
                barrioMunicipio: '',
                telefono: '',
                observaciones: '',
                tipoPlaga: '',
                fecha: '',
                hora: '',
                tecnico: '',
                precio: '' // Limpiar precio después de guardar
            });
        } catch (error) {
            console.error('Error al guardar en Firestore:', error);
        }
    };

    const retroceder = () => {
        navigate(-1);
    };

    useEffect(() => {
        const obtenerServiciosProgramados = async () => {
            try {
                const snapshot = await getDocs(serviciosCollection);
                const serviciosData = {};
                snapshot.forEach(doc => {
                    const servicio = doc.data();
                    const fecha = servicio.fecha;
                    serviciosData[fecha] = serviciosData[fecha] || [];
                    serviciosData[fecha].push(servicio);
                });
                setServiciosProgramados(serviciosData);
            } catch (error) {
                console.error('Error al obtener servicios programados:', error);
            }
        };
        obtenerServiciosProgramados();
    }, [serviciosCollection]);

    // Función para ocultar la alerta
    const aceptarAlerta = () => {
        setShowAlert(false);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900"><h2>Santiago</h2>Programación de Servicios</h3>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4 px-4 py-5 sm:px-6">
                    {Object.entries(cliente).map(([key, value]) => (
                        <div key={key}>
                            <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </label>
                            <input
                                type={key === 'fecha' || key === 'hora' ? key : 'text'}
                                id={key}
                                name={key}
                                value={value}
                                onChange={handleChange}
                                placeholder={`Ingrese ${key}`}
                                className="mt-1 p-2 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                            />
                        </div>
                    ))}
                    <div className="flex justify-start">
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Guardar
                        </button>
                        <button
                            onClick={retroceder}
                            className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            Atrás
                        </button>
                    </div>
                </form>
            </div>

            <div className="mt-8">
                {Object.entries(serviciosProgramados).map(([fecha, servicios]) => (
                    <div key={fecha} className="mb-8">
                        <h2 className="text-lg font-medium text-gray-900">{fecha}</h2>
                        <div className="overflow-x-auto mt-4">
                            <table className="w-full whitespace-nowrap">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Hora</th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre Cliente</th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Barrio/Municipio</th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo de Plaga</th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Observaciones</th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Técnico</th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th> {/* Agregar la columna para el precio */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {servicios.map((servicio, index) => (
                                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{servicio.hora}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{servicio.nombreCliente}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{servicio.telefono}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{servicio.direccionCliente}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{servicio.barrioMunicipio}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{servicio.tipoPlaga}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{servicio.observaciones}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{servicio.tecnico}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{servicio.precio}</td> {/* Mostrar el precio */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>

            {/* Alerta para campo obligatorio */}
            {showAlert && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg font-medium text-gray-900">Campo obligatorio</h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">Por favor, complete el campo Nombre Cliente.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    onClick={aceptarAlerta}
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Aceptar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Programacion3;
