import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ShopDashboard = () => {
  const [productos, setProductos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Obtén el nombre del usuario desde localStorage
  const name = localStorage.getItem('name') || '';


  // Obtén los productos registrados por la tienda
  const fetchProductos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/productos');
      const productosTienda = response.data.filter(producto => producto.marca === name);
      setProductos(productosTienda);
    } catch (error) {
      console.error('Error al obtener los productos', error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 shadow-md rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-2">¡Bienvenido, {name}!</h2>

        <p className="text-gray-700">
          Este es tu dashboard, donde puedes registrar nuevos productos, consultar los productos existentes y modificarlos según sea necesario.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-bold mb-2">Registrar</h2>
          <p className="text-gray-700">
            Aquí puedes registrar nuevos productos para tu tienda. Completa el formulario para agregar nuevos artículos a tu inventario.
          </p>
        </div>
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-bold mb-2">Consultar</h2>
          <p className="text-gray-700">
            Consulta los productos que ya has registrado. Puedes ver los detalles de cada producto y hacer modificaciones si es necesario.
          </p>
        </div>
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-bold mb-2">Modificar</h2>
          <p className="text-gray-700">
            Modifica los detalles de los productos que has registrado. Actualiza precios, descripciones, imágenes y más.
          </p>
        </div>
      </div>

      <div className="bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Productos Registrados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {productos.length > 0 ? (
            productos.map(producto => (
              <div key={producto.id} className="bg-gray-100 p-4 rounded-lg">
                <div className="w-full h-48 relative mb-4">
                  <img 
                    src={producto.imagen} 
                    alt={producto.nombre} 
                    className="object-cover w-full h-full absolute inset-0 rounded-lg" 
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{producto.nombre}</h3>
                <Link to="/gestion-productos">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Gestión de Productos
                  </button>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No tienes productos registrados.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopDashboard;
