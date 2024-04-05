import React, { useState, useEffect } from 'react';
import OrangeButton from './OrangeButton';
import { firestore } from '../firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const Tareas = () => {
    const serviciosCollection = collection(firestore, 'tareas');
    const [showOrangeButton, setShowOrangeButton] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const querySnapshot = await getDocs(serviciosCollection);
            const fetchedTasks = [];
            querySnapshot.forEach(doc => {
                fetchedTasks.push({ id: doc.id, ...doc.data() });
            });
            setTasks(fetchedTasks);
        };

        fetchTasks();
    }, [serviciosCollection]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleAddTask = async () => {
        if (inputValue.trim() !== '') {
            try {
                const docRef = await addDoc(serviciosCollection, {
                    text: inputValue.trim(),
                    completed: false
                });
                setTasks(prevTasks => [...prevTasks, { id: docRef.id, text: inputValue.trim(), completed: false }]);
                setInputValue('');
            } catch (error) {
                console.error('Error adding document: ', error);
            }
        }
    };

   

    const handleCompleteTask = async (taskId) => {
        try {
            const taskRef = doc(serviciosCollection, taskId);
            await updateDoc(taskRef, { completed: true });
            setTasks(prevTasks => prevTasks.map(task =>
                task.id === taskId ? { ...task, completed: true } : task
            ));
        } catch (error) {
            console.error('Error updating document: ', error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await deleteDoc(doc(serviciosCollection, taskId));
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error('Error deleting document: ', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            {showOrangeButton && <OrangeButton />}
            <div className="flex items-center justify-center">
                <button
                    onClick={() => setShowOrangeButton(!showOrangeButton)}
                    className="bg-orange-500 relative flex items-center justify-center w-12 h-12 rounded-full overflow-hidden focus:outline-none"
                >
                    <svg
                        className="h-6 w-6 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 10h16M4 14h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>

            <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mt-10">
                <h1 className="text-2xl font-bold mb-4">Tablero de Tareas</h1>
                <div className="mb-4">
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Escribe una tarea"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                        onClick={handleAddTask}
                    >
                        Agregar Tarea
                    </button>
                </div>
                <ul className="mt-4">
                    {tasks.map(task => (
                        <li key={task.id} className="flex items-center justify-between mb-2">
                            <span className={task.completed ? "line-through text-gray-500" : "text-black"}>
                                {task.text}
                            </span>
                            <div>
                                <button
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2"
                                    onClick={() => handleCompleteTask(task.id)}
                                >
                                    {task.completed ? 'Deshacer' : 'Completar'}
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                    onClick={() => handleDeleteTask(task.id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Tareas;
