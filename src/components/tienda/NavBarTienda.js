import React, { useContext } from 'react';
import {FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'
import UserContext from '../../context/UserContext';

const NavbarTienda = () => {
    const { logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Llama a la función de cierre de sesión
        navigate('/login'); // Redirige al inicio de sesión
    };

    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-900">
                        OmegaPetShop
                    </span>
                </a>
                <div className="w-full md:block md:w-auto">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
                        <li>
                            <a
                                href="/gestion-productos"
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                            >
                                Productos
                            </a>
                        </li>                       
                        <li>
                            <button
                                onClick={handleLogout}
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                            >
                                <FaSignOutAlt className="inline-block mr-2 text-indigo-500" /> Cerrar Sesión
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavbarTienda;
