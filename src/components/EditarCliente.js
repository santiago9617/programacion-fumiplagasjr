import React from 'react';

const EditField = ({ label, value, onChange }) => {
  const handleChange = e => {
    const { value } = e.target;
    onChange(value);
  };

  return (
    <div>
      <label htmlFor={label} className="block text-sm font-medium text-gray-700">
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </label>
      <input
        type="text"
        id={label}
        value={value}
        onChange={handleChange}
        placeholder={`Ingrese ${label}`}
        className="mt-1 p-2 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
      />
    </div>
  );
};

export default EditField;
