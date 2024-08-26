import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const categorias = ['Todos', 'Alimentos', 'Snacks', 'Accesorios'];

const GestionProductos = () => {
    const [productos, setProductos] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');
    const [error, setError] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [productoAEliminar, setProductoAEliminar] = useState(null);

    const navigate = useNavigate();

    // Obtener el nombre de la tienda desde localStorage
    const nombreTienda = localStorage.getItem('name') || '';

    // Obtener los productos de la API
    const fetchProductos = async () => {
        try {
            const response = await axios.get('http://localhost:5000/productos');
            setProductos(response.data.filter(producto => producto.marca === nombreTienda && producto.estado === 'activo'));
        } catch (error) {
            console.error('Error al obtener los productos', error);
            setError('No se pudieron cargar los productos.');
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    // Filtrar productos según la categoría seleccionada
    const productosFiltrados = productos.filter(producto =>
        (categoriaSeleccionada === 'Todos' || producto.categoria === categoriaSeleccionada)
    );

    const handleDelete = async () => {
        if (!productoAEliminar) return;

        try {
            await axios.put(`http://localhost:5000/productos/${productoAEliminar.id}`, { ...productoAEliminar, estado: 'inactivo' });
            fetchProductos();
            setAlertMessage('Producto eliminado exitosamente.');
        } catch (error) {
            console.error('Error al eliminar el producto', error);
            setError('No se pudo eliminar el producto.');
        } finally {
            setProductoAEliminar(null); // Cerrar el modal
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Gestión de Productos</h1>
            <p className="mb-8">
                En esta sección podrás gestionar tus productos. Puedes agregar nuevos productos,
                visualizar los productos que ya has registrado y eliminarlos según sea necesario.
            </p>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            {alertMessage && (
                <div className="mb-4 p-4 bg-green-100 text-green-800 border border-green-300 rounded">
                    {alertMessage}
                </div>
            )}

            <div className="mb-4 flex space-x-4">
                <button
                    onClick={() => navigate('/registro-producto')}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    <FaPlus className="inline-block mr-2" /> Registrar Producto
                </button>
                <button
                    onClick={() => navigate('/productos-inactivos')}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                    Productos Inactivos
                </button>
            </div>

            <div className="mb-6">
                <select
                    value={categoriaSeleccionada}
                    onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                >
                    {categorias.map(categoria => (
                        <option key={categoria} value={categoria}>{categoria}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {productosFiltrados.length > 0 ? (
                    productosFiltrados.map((producto) => (
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
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => navigate(`/editar-producto/${producto.id}`)}
                                        className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => setProductoAEliminar(producto)}
                                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">Aún no tienes productos registrados.</p>
                )}
            </div>

            {/* Modal de confirmación */}
            {productoAEliminar && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl mb-4">¿Estás seguro de que deseas eliminar este producto?</h3>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setProductoAEliminar(null)}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GestionProductos;
