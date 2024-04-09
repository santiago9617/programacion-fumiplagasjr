import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../firebase';
import { collection, addDoc, getDocs, doc, updateDoc } from 'firebase/firestore';

const Programacion1 = () => {
  const navigate = useNavigate();
  const serviciosCollection = collection(firestore, 'servicios');

  const [serviciosProgramados, setServiciosProgramados] = useState({});

  const clienteNuevo = {
    id: '', // Agregamos un campo para almacenar el ID del documento
    nombreCliente: '',
    direccionCliente: '',
    barrioMunicipio: '',
    telefono: '',
    tipoPlaga: '',
    fecha: '',
    hora: '',
    tecnico: 'Jhon Mario',
    precio: '' 
  };

  const [cliente, setCliente] = useState(clienteNuevo);

  const handleChange = e => {
    const { name, value } = e.target;
    setCliente(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Validar que el nombre del cliente esté presente
    if (!cliente.nombreCliente) {
      alert('Por favor ingrese el nombre del cliente.');
      return;
    }

    try {
      if (cliente.id) { // Si hay un ID, actualizamos el documento existente
        await updateDoc(doc(serviciosCollection, cliente.id), cliente);
        console.log('Documento actualizado en Firestore con ID:', cliente.id);
      } else { // Si no hay un ID, agregamos un nuevo documento
        const docRef = await addDoc(serviciosCollection, cliente);
        console.log('Documento guardado en Firestore con ID:', docRef.id);
      }
      setCliente(clienteNuevo);
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
          serviciosData[fecha].push({ ...servicio, id: doc.id }); // Añadir el ID del documento al objeto del servicio
        });
        setServiciosProgramados(serviciosData);
      } catch (error) {
        console.error('Error al obtener servicios programados:', error);
      }
    };
    obtenerServiciosProgramados();
  }, [serviciosCollection]);

  const handleEdit = servicio => {
    setCliente(servicio);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Programación de Servicios</h3>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 px-4 py-5 sm:px-6">
          {Object.entries(cliente).map(([key, value]) => (
            <div key={key}>
              <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                type={key === 'fecha' || key === 'hora' ? key : key === 'precio' ? 'number' : 'text'}
                id={key}
                name={key}
                value={value}
                onChange={handleChange}
                placeholder={key === 'fecha' ? 'DD-MM-YYYY' : key === 'hora' ? 'HH:MM' : `Ingrese ${key}`}
                className="mt-1 p-2 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                required={key === 'nombreCliente'}
              />
            </div>
          ))}

          <div className="flex justify-start">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {cliente.id ? 'Actualizar' : 'Guardar'} {/* Cambiado el texto del botón según si hay un ID de cliente */}
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
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{fecha}</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-lg font-semibold text-gray-700 border">Hora</th>
              <th className="px-4 py-2 text-lg font-semibold text-gray-700 border">Nombre Cliente</th>
              <th className="px-4 py-2 text-lg font-semibold text-gray-700 border">Teléfono</th>
              <th className="px-4 py-2 text-lg font-semibold text-gray-700 border">Dirección</th>
              <th className="px-4 py-2 text-lg font-semibold text-gray-700 border">Barrio/Municipio</th>
              <th className="px-4 py-2 text-lg font-semibold text-gray-700 border">Tipo de Plaga</th>
              <th className="px-4 py-2 text-lg font-semibold text-gray-700 border">Técnico</th>
              <th className="px-4 py-2 text-lg font-semibold text-gray-700 border">Precio</th>
              <th className="px-4 py-2 text-lg font-semibold text-gray-700 border">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {servicios
              .sort((a, b) => {
                // Ordenar los servicios por hora
                if (a.hora < b.hora) return -1;
                if (a.hora > b.hora) return 1;
                return 0;
              })
              .map((servicio, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                  <td className="px-4 py-2 whitespace-normal text-lg text-gray-900 border">{servicio.hora}</td>
                  <td className="px-4 py-2 whitespace-normal text-lg text-gray-900 border">{servicio.nombreCliente}</td>
                  <td className="px-4 py-2 whitespace-normal text-lg text-gray-900 border">{servicio.telefono}</td>
                  <td className="px-4 py-2 whitespace-normal text-lg text-gray-900 border">{servicio.direccionCliente}</td>
                  <td className="px-4 py-2 whitespace-normal text-lg text-gray-900 border">{servicio.barrioMunicipio}</td>
                  <td className="px-4 py-2 whitespace-normal text-lg text-gray-900 border">{servicio.tipoPlaga}</td>
                  <td className="px-4 py-2 whitespace-normal text-lg text-gray-900 border">{servicio.tecnico}</td>
                  <td className="px-4 py-2 whitespace-normal text-lg text-gray-900 border">{servicio.precio}</td>
                  <td className="px-4 py-2 whitespace-normal text-lg text-gray-900 border">
                    <button
                      onClick={() => handleEdit(servicio)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  ))}
</div>
    </div>
  );
};

export default Programacion1;
