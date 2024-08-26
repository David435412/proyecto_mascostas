import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const categorias = ['Alimentos', 'Snacks', 'Accesorios'];

const EditarProducto = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        precio: '',
        descripcion: '',
        imagen: '',
        categoria: '',
        cantidad: '',
        estado: 'activo'
    });
    const [alertMessage, setAlertMessage] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/productos/${id}`);
                setFormData(response.data);
            } catch (error) {
                console.error('Error al obtener el producto', error);
                setError('No se pudo cargar el producto.');
            }
        };

        fetchProducto();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.put(`http://localhost:5000/productos/${id}`, formData);
            alert('Producto actualizado exitosamente.');
            
            // Redirigir a la vista de gestión de productos
            navigate('/gestion-productos');
        } catch (error) {
            console.error('Error al actualizar el producto', error);
            setError('No se pudo actualizar el producto.');
        }
    };

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <h1 className="text-3xl font-bold mb-4">Editar Producto</h1>

                {error && <p className="text-red-500 mb-4">{error}</p>}
                {alertMessage && (
                    <div className="mb-4 p-4 bg-green-100 text-green-800 border border-green-300 rounded">
                        {alertMessage}
                    </div>
                )}

                <div className="w-full bg-white rounded-lg shadow-md md:mt-0 sm:max-w-md xl:p-0 border border-gray-200">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-gray-700 font-medium">Nombre</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Precio</label>
                                <input
                                    type="number"
                                    name="precio"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value={formData.precio}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Descripción</label>
                                <textarea
                                    name="descripcion"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value={formData.descripcion}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Imagen (URL)</label>
                                <input
                                    type="text"
                                    name="imagen"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value={formData.imagen}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Categoría</label>
                                <select
                                    name="categoria"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value={formData.categoria}
                                    onChange={handleChange}
                                    required
                                >
                                    {categorias.map(categoria => (
                                        <option key={categoria} value={categoria}>{categoria}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Cantidad</label>
                                <input
                                    type="number"
                                    name="cantidad"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value={formData.cantidad}
                                    onChange={handleChange}
                                    required
                                    min="1"
                                    max="1000"
                                />
                            </div>               
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={() => navigate('/gestion-productos')}
                                    className="px-8 py-4 bg-gradient-to-r from-gray-500 to-red-500 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
                                >
                                    Actualizar Producto
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EditarProducto;
