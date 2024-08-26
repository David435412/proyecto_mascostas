import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductosInactivos = () => {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const navigate = useNavigate();

    // Obtener el nombre de la tienda desde localStorage
    const nombreTienda = localStorage.getItem('name') || '';

    // Obtener los productos inactivos de la API
    const fetchProductosInactivos = async () => {
        try {
            const response = await axios.get('http://localhost:5000/productos');
            setProductos(response.data.filter(producto => producto.marca === nombreTienda && producto.estado === 'inactivo'));
        } catch (error) {
            console.error('Error al obtener los productos inactivos', error);
            setError('No se pudieron cargar los productos inactivos.');
        }
    };

    useEffect(() => {
        fetchProductosInactivos();
    }, []);

    const handleReactivar = async (producto) => {
        try {
            await axios.put(`http://localhost:5000/productos/${producto.id}`, { ...producto, estado: 'activo' });
            fetchProductosInactivos();
            setAlertMessage('Producto reactivado exitosamente.');
        } catch (error) {
            console.error('Error al reactivar el producto', error);
            setError('No se pudo reactivar el producto.');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Productos Inactivos</h1>
            <p className="mb-8">
                Aquí puedes ver los productos que has inactivado. Puedes reactivarlos si deseas que estén disponibles nuevamente en la tienda.
            </p>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            {alertMessage && (
                <div className="mb-4 p-4 bg-green-100 text-green-800 border border-green-300 rounded">
                    {alertMessage}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {productos.length > 0 ? (
                    productos.map((producto) => (
                        <div key={producto.id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                            <div className="w-full h-64 relative">
                                <img
                                    src={producto.imagen}
                                    alt={producto.nombre}
                                    className="object-cover w-full h-full absolute inset-0"
                                />
                            </div>
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2">{producto.nombre}</h2>
                                <p className="text-gray-900 font-bold mb-4">${producto.precio}</p>
                                <button
                                    onClick={() => handleReactivar(producto)}
                                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                                >
                                    Reactivar
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No tienes productos inactivos.</p>
                )}
            </div>

            <button
                onClick={() => navigate('/gestion-productos')}
                className="mt-8 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Volver a Gestión de Productos
            </button>
        </div>
    );
};

export default ProductosInactivos;
