// Buscar.js
import React, { useState } from 'react';

function Buscar({ onSearch }) {
    const [searchInput, setSearchInput] = useState('');

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSearch = () => {
        onSearch(searchInput);
    };

    const handleReloadPage = () => {
        window.location.reload();
    };

    return (
        <div className="flex items-center">
            <input 
                type="text" 
                value={searchInput} 
                onChange={handleInputChange} 
                placeholder="Buscar por nombre o dirección" 
                className="py-3 px-5 border border-gray-300 rounded-l-md focus:outline-none focus:border-gray-500 w-64"
            />
            <button onClick={handleSearch} className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-r-md focus:outline-none ml-1">
                Buscar
            </button>
            <button onClick={handleReloadPage} className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-r-md focus:outline-none ml-1">
                <svg className="h-6 w-6 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
}

export default Buscar;
