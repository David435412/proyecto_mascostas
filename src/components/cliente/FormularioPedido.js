import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DatosEntrega = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        tipoDocumento: '',
        numeroDocumento: '',
        celular: '',
        direccion: '',
        metodoPago: ''       
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para enviar los datos o validaciones
        console.log('Datos de entrega:', formData);
        navigate('/confirmacion'); // Redirige a una página de confirmación o la siguiente vista
    };

    return (
        <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px] bg-white p-6 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="nombre" className="mb-3 block text-base font-medium text-[#07074D]">
                            Nombre
                        </label>
                        <input
                            type="text"
                            name="nombre"
                            id="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Nombre Completo"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="apellido" className="mb-3 block text-base font-medium text-[#07074D]">
                            Apellido
                        </label>
                        <input
                            type="text"
                            name="apellido"
                            id="apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                            placeholder="Apellido"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="correo" className="mb-3 block text-base font-medium text-[#07074D]">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            name="correo"
                            id="correo"
                            value={formData.correo}
                            onChange={handleChange}
                            placeholder="nombre@ejemplo.com"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            required
                        />
                    </div>
                    <div className="-mx-3 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/2">
                            <div className="mb-5">
                                <label htmlFor="tipoDocumento" className="mb-3 block text-base font-medium text-[#07074D]">
                                    Tipo de Documento
                                </label>
                                <select
                                    name="tipoDocumento"
                                    id="tipoDocumento"
                                    value={formData.tipoDocumento}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    required
                                >
                                    <option value="">Seleccione</option>
                                    <option value="DNI">DNI</option>
                                    <option value="Pasaporte">Pasaporte</option>
                                    <option value="Otro">Otro</option>
                                </select>
                            </div>
                        </div>
                        <div className="w-full px-3 sm:w-1/2">
                            <div className="mb-5">
                                <label htmlFor="numeroDocumento" className="mb-3 block text-base font-medium text-[#07074D]">
                                    Número de Documento
                                </label>
                                <input
                                    type="text"
                                    name="numeroDocumento"
                                    id="numeroDocumento"
                                    value={formData.numeroDocumento}
                                    onChange={handleChange}
                                    placeholder="Número de Documento"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="-mx-3 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/2">
                            <div className="mb-5">
                                <label htmlFor="celular" className="mb-3 block text-base font-medium text-[#07074D]">
                                    Celular
                                </label>
                                <input
                                    type="tel"
                                    name="celular"
                                    id="celular"
                                    value={formData.celular}
                                    onChange={handleChange}
                                    placeholder="Número de Celular"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    required
                                />
                            </div>
                        </div>
                        <div className="w-full px-3 sm:w-1/2">
                            <div className="mb-5">
                                <label htmlFor="direccion" className="mb-3 block text-base font-medium text-[#07074D]">
                                    Dirección
                                </label>
                                <input
                                    type="text"
                                    name="direccion"
                                    id="direccion"
                                    value={formData.direccion}
                                    onChange={handleChange}
                                    placeholder="Dirección Completa"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="metodoPago" className="mb-3 block text-base font-medium text-[#07074D]">
                            Método de Pago
                        </label>
                        <select
                            name="metodoPago"
                            id="metodoPago"
                            value={formData.metodoPago}
                            onChange={handleChange}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            required
                        >
                            <option value="">Seleccione</option>
                            <option value="efectivo">Efectivo</option>
                            <option value="tarjetaCredito">Tarjeta de Crédito</option>
                        </select>
                    </div>                   
                    <div>
                        <button
                            type="submit"
                            className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                        >
                            Confirmar Datos
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DatosEntrega;
