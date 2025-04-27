import React, { useState } from 'react';
import buscar from "../assets/img/buscar.png";

const SearchFilter = ({ apiUrl, onFilter }) => {
    const [filter, setFilter] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [error, setError] = useState('');

    const handleSearch = () => {
        // Validación de campos vacíos
        if (!filter.trim() || !startDate || !endDate) {
            setError('All fields are required');
            return;
        }
    
        // Limpiar el mensaje de error si los campos están completos
        setError('');
    
        const url = `${apiUrl.replace(/\/$/, '')}/search?filter=${encodeURIComponent(filter)}&startDate=${startDate}&endDate=${endDate}`;
    
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                onFilter(data); // Enviar los datos filtrados a la función onFilter
            })
            .catch((error) => console.error('Error al obtener datos filtrados:', error));
    };
    

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <div className="gap-2 items-center mx-auto mt-5 max-w-full sm:max-w-[56rem] w-full bg-amber-50 p-4 rounded-lg">
            {error && (
                <div className="text-red-500 text-sm mb-4 text-center">
                    {error}
                </div>
            )}

            <div className="flex gap-2 w-full">
                <div className='w-auto sm:w-1/3'>
                    <label className="block text-sm font-medium text-gray-700">
                        Search  <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Search by title, author, employee or user..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="w-full p-2 rounded-lg border border-gray-300"
                    />
                </div>

                <div className="w-full sm:w-1/3">
                    <label className="block text-sm font-medium text-gray-700">
                        Date Loan <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full p-2 rounded-lg border border-gray-300"
                    />
                </div>

                <div className="w-full sm:w-1/3">
                    <label className="block text-sm font-medium text-gray-700">
                        Date Return <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full p-2 rounded-lg border border-gray-300"
                    />
                </div>

                <div className="w-full sm:w-auto flex justify-center sm:justify-start mt-4 sm:mt-0">
                    <button
                        onClick={handleSearch}
                        className="bg-[#883429] text-white p-2 rounded-lg hover:bg-orange-200 flex items-center justify-center"
                    >
                        <img src={buscar} alt="buscar" className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchFilter;
