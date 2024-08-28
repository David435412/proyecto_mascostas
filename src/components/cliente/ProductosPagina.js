import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const categorias = ['Todos', 'Alimentos', 'Snacks', 'Accesorios'];

const ProductosPagina = () => {
    const [productos, setProductos] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');
    const [marcaSeleccionada, setMarcaSeleccionada] = useState('Todas');
    const [error, setError] = useState('');

    // Obtén los productos de la API
    const fetchProductos = async () => {
        try {
            const response = await axios.get('http://localhost:5000/productos');
            // Filtrar solo productos activos
            const productosActivos = response.data.filter(producto => producto.estado === 'activo');
            setProductos(productosActivos);

            // Extraer marcas únicas de los productos
            const marcasUnicas = [...new Set(productosActivos.map(producto => producto.marca))];
            setMarcas(['Todas', ...marcasUnicas]);  // Agregar 'Todas' al inicio
        } catch (error) {
            console.error('Error al obtener los productos', error);
            setError('No se pudieron cargar los productos.');
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    // Filtra productos según categoría y marca seleccionadas
    const productosFiltrados = productos.filter(producto => 
        (categoriaSeleccionada === 'Todos' || producto.categoria === categoriaSeleccionada) &&
        (marcaSeleccionada === 'Todas' || producto.marca === marcaSeleccionada)
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Encuentra los Mejores Productos para tus Mascotas</h1>
            <p className="mb-8">
                En esta sección encontrarás una amplia selección de productos para tus mascotas. 
                Usa los filtros a continuación para encontrar exactamente lo que buscas, ya sea por categoría o por marca.
            </p>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Filtros */}
            <div className="mb-6 flex space-x-4">
                <select 
                    value={categoriaSeleccionada} 
                    onChange={(e) => setCategoriaSeleccionada(e.target.value)} 
                    className="p-2 border border-gray-300 rounded"
                >
                    {categorias.map(categoria => (
                        <option key={categoria} value={categoria}>{categoria}</option>
                    ))}
                </select>

                <select 
                    value={marcaSeleccionada} 
                    onChange={(e) => setMarcaSeleccionada(e.target.value)} 
                    className="p-2 border border-gray-300 rounded"
                >
                    {marcas.map(marca => (
                        <option key={marca} value={marca}>{marca}</option>
                    ))}
                </select>
            </div>

            {/* Productos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {productosFiltrados.length > 0 ? (
                    productosFiltrados.map(producto => (
                        <Link to={`/producto/${producto.id}`} key={producto.id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
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
                                    className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    Ver más
                                </button>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="text-gray-500">No hay productos disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default ProductosPagina;
