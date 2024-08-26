import React, { useContext } from 'react';
import { FaHome, FaPaw, FaUserAlt } from 'react-icons/fa';
import UserContext from '../../context/UserContext';

const NavbarAnon = () => {
    const { role } = useContext(UserContext);

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
                                href="/"
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                            >
                                <FaHome className="inline-block mr-2 text-indigo-500" /> Inicio
                            </a>
                        </li>
                        <li>
                            <a
                                href="/productos"
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                            >
                                <FaPaw className="inline-block mr-2 text-indigo-500" /> Productos
                            </a>
                        </li>
                        <li>
                            <a
                                href="/login"
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                            >
                                <FaUserAlt className="inline-block mr-2 text-indigo-500" /> Iniciar Sesión
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavbarAnon;
