import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistroTienda = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        role: 'tienda',
        estado: 'activo' // Agregado el campo estado con valor por defecto
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Verificar si el correo electrónico ya está en uso
            const emailCheckResponse = await axios.get('http://localhost:5000/usuarios', {
                params: { email: formData.email }
            });

            // Verificar si el nombre de la tienda ya está en uso
            const nameCheckResponse = await axios.get('http://localhost:5000/usuarios', {
                params: { name: formData.name }
            });

            // Ajustar la lógica para los errores
            if (emailCheckResponse.data.length > 0) {
                setError('El correo electrónico ya está en uso.');
                return;
            }

            if (nameCheckResponse.data.length > 0) {
                setError('El nombre de la tienda ya está en uso.');
                return;
            }

            // Si las verificaciones pasaron, registrar la tienda
            await axios.post('http://localhost:5000/usuarios', {
                ...formData
            });
            alert('Tienda registrada con éxito');
            navigate('/login');
            // Redirige o limpia el formulario si es necesario
        } catch (error) {
            console.error('Error al registrar la tienda', error);
            setError('Hubo un error al registrar la tienda. Por favor, intenta de nuevo.');
        }
    };

    return (
        <div>
            <section className="bg-gray-50">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow-md md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Crea tu cuenta
                            </h1>
                            <ul>
                                <div className="flex justify-between mb-4">
                                    <li>
                                        <a
                                            href="/registro-cliente"
                                            className="shadow bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        >
                                            Cliente
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/registro-tienda"
                                            className="shadow bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        >
                                            Empresa
                                        </a>
                                    </li>
                                </div>
                            </ul>
                            {error && <p className="text-red-500">{error}</p>}
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Nombre de la Empresa
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="Nombre de tu empresa"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Correo Electrónico
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="email@company.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Teléfono
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="3123456789"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Contraseña
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        required
                                    />
                                </div>
                                <input type="hidden" name="role" value={formData.role} />
                                <input type="hidden" name="estado" value={formData.estado} /> {/* Campo oculto para estado */}
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="terms"
                                            aria-describedby="terms"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                                            required
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label
                                            htmlFor="terms"
                                            className="font-light text-gray-500"
                                        >
                                            Acepto los{" "}
                                            <a
                                                className="font-medium text-primary-600 hover:underline"
                                                href="#"
                                            >
                                                Términos y Condiciones
                                            </a>
                                        </label>
                                    </div>
                                </div>
                                <button type="submit" className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg">
                                    Crear
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RegistroTienda;
