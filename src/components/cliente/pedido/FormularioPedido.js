import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Asegúrate de tener Axios instalado
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const FormularioPedido = () => {
    const [pedido, setPedido] = useState([]);
    const [direccion, setDireccion] = useState('');
    const [error, setError] = useState('');
    const [montoTotal, setMontoTotal] = useState(0);

    const navigate = useNavigate(); // Inicializar useNavigate

    useEffect(() => {
        // Obtener productos del pedido del localStorage
        const pedidoData = JSON.parse(localStorage.getItem('pedidoActual')) || [];
        setPedido(pedidoData);

        // Calcular el monto total
        const total = pedidoData.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
        setMontoTotal(total);

    }, []);

    // Obtener datos del cliente logueado desde el localStorage
    const nombre = localStorage.getItem('name') || ''; 
    const telefono = localStorage.getItem('phone') || ''; 
    const correo = localStorage.getItem('email') || '';   

    const handleDireccionChange = (e) => {
        setDireccion(e.target.value);
    };

    const handleConfirmarPedido = async () => {
        if (!direccion.trim()) {
            setError('Por favor, ingrese una dirección de envío.');
            return;
        }

        const nuevoPedido = {
            cliente: {
                nombre,
                telefono,
                correo,
            },
            productos: pedido,
            direccion,
            estado: 'activo',
            estadoEntrega: 'pendiente',
            montoTotal,
        };

        try {
            // Guardar el pedido en la tabla de pedidos usando una solicitud HTTP
            await axios.post('http://localhost:5000/pedidos', nuevoPedido); // Cambia la URL por la de tu servidor o API

            // Mostrar mensaje de éxito
            alert('Pedido confirmado exitosamente. ¡Gracias por su compra!');

            // Limpiar el estado y localStorage después de confirmar el pedido
            setPedido([]);
            setDireccion('');
            setError('');
            localStorage.removeItem('pedidoActual');

            // Vaciar el carrito en el localStorage (si existe)
            localStorage.removeItem('pedidoActual'); // Asegúrate de que esto coincida con la clave de tu carrito

            // Redirigir al usuario al carrito
            navigate('/carrito'); // Cambia la ruta según tu configuración
        } catch (error) {
            console.error('Error al guardar el pedido:', error);
            setError('Ocurrió un error al confirmar el pedido. Inténtelo de nuevo.');
        }
    };

    const handleCancelarPedido = () => {
        // Redirigir al usuario al carrito
        navigate('/carrito'); // Cambia la ruta según tu configuración
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold mb-6">Confirmar Pedido</h1>
            
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Datos del Cliente</h2>
                <p><strong>Nombre:</strong> {nombre}</p>
                <p><strong>Teléfono:</strong> {telefono}</p>
                <p><strong>Correo:</strong> {correo}</p>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Productos del Pedido</h2>
                <ul className="list-disc pl-5">
                    {pedido.length > 0 ? (
                        pedido.map((producto) => (
                            <li key={producto.id} className="mb-4 flex items-center">
                                <img 
                                    src={producto.imagen} 
                                    alt={producto.nombre} 
                                    className="w-16 h-16 object-cover rounded mr-4"
                                />
                                <div>
                                    <p>{producto.nombre} - Cantidad: {producto.cantidad} - Precio: ${(producto.precio * producto.cantidad).toFixed(3)}</p>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>No hay productos en el pedido.</p>
                    )}
                </ul>

                {/* Mostrar el monto total */}
                {pedido.length > 0 && (
                    <p className="text-xl font-bold mt-4">Monto Total: ${montoTotal.toFixed(3)}</p>
                )}
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Dirección de Envío</h2>
                <input
                    type="text"
                    value={direccion}
                    onChange={handleDireccionChange}
                    placeholder="Ingrese su dirección"
                    className="w-full p-2 border border-gray-300 rounded"
                />
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>

            <div className="flex space-x-4">
                <button 
                    onClick={handleConfirmarPedido} 
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
                >
                    Confirmar Pedido
                </button>

                <button 
                    onClick={handleCancelarPedido} 
                    className="px-8 py-4 bg-red-600 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
};

export default FormularioPedido;
