// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import UserContext from './context/UserContext';
import NavbarAnon from './components/comun/Navbar';
import NavbarCliente from './components/cliente/NavBarCliente';
import NavbarTienda from './components/tienda/NavBarTienda';
import Home from './pages/Home';
import Login from './components/auth/Login';
import RegistroCliente from './components/auth/RegistroCliente';
import RegistroTienda from './components/auth/RegistroTienda';
import ProductosPagina from './pages/ProductosPagina';
import DetalleProducto from './components/cliente/DetallesProducto';
import TiendaDash from './pages/TiendaDash';
import Cart from './components/cliente/Cart';
import GestionProductos from './components/tienda/GestionProductos';
import RegistroProducto from './components/tienda/RegistroProducto';
import EditarProducto from './components/tienda/EdicionProductos';
import ProductosInactivos from './components/tienda/ProductosInactivos';
import FormularioPedido from './components/cliente/FormularioPedido'

const App = () => {
    const { role } = useContext(UserContext);

    let NavbarComponent;

    if (role === 'cliente') {
        NavbarComponent = NavbarCliente;
    } else if (role === 'tienda') {
        NavbarComponent = NavbarTienda;
    } else {
        NavbarComponent = NavbarAnon;
    }

    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                <NavbarComponent />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/registro-cliente" element={<RegistroCliente />} />      
                        <Route path="/registro-tienda" element={<RegistroTienda />} />  
                        <Route path="/productos" element={<ProductosPagina />} />
                        <Route path="/producto/:id" element={<DetalleProducto />} />   
                        <Route path="/tienda" element={<TiendaDash />} />   
                        <Route path="/carrito" element={<Cart />} />
                        <Route path="/gestion-productos" element={<GestionProductos />} />
                        <Route path="/registro-producto" element={<RegistroProducto />} />
                        <Route path="/editar-producto/:id" element={<EditarProducto />} />
                        <Route path="/productos-inactivos" element={<ProductosInactivos />} />
                        <Route path="/formulario-pedido" element={<FormularioPedido />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
