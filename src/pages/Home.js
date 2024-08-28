
import React from 'react';

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            <div className="mt-28 mb-28 py-12">
                <div className="max-w-screen-md mx-auto text-center">
                    <h1 className="mb-4 text-4xl font-bold text-gray-900">
                        Bienvenido a <span className="text-indigo-600">OmegaPetShop</span>
                    </h1>
                    <p className="text-gray-600">
                        Tu tienda de confianza para todo lo que tu mascota necesita.
                    </p>
                </div>

                <div className="relative max-w-full mx-auto mt-20">
                    <img
                        className="h-72 w-full object-cover rounded-md"
                        src="https://static.miscota.com/media/1/banners/banner_1716797318_cixwIGRB.webp"
                        alt="Banner Principal"
                    />
                    <div className="absolute inset-0 bg-gray-700 opacity-60 rounded-md" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h2 className="text-white text-3xl font-bold">Descubre lo Mejor para tu Mascota</h2>
                    </div>
                </div>

                <div className="flex flex-col justify-center space-y-5 md:flex-row md:space-y-0 md:space-x-6 lg:space-x-10 mt-7 mb-8">
                    <div className="relative md:w-5/12">
                        <img
                            className="rounded-2xl shadow-lg"
                            src="https://static.miscota.com/media/1/banners/banner_1716797470_ci8zbF6C.webp"
                            alt="Learn Webby"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gray-900 bg-opacity-60 rounded-2xl">
                            <h1 className="text-white mb-3 font-bold text-lg lg:text-xl text-center uppercase">
                                Aprende con Webby
                            </h1>
                            <button className="px-6 py-3 text-sm text-white transition duration-300 ease-in-out transform bg-indigo-500 border-indigo-400 border-2 rounded-full hover:scale-105 focus:outline-none font-medium">
                                Ver Documentación
                            </button>
                        </div>
                    </div>

                    <div className="relative md:w-5/12">
                        <img
                            className="rounded-2xl shadow-lg"
                            src="https://static.miscota.com/media/1/banners/banner_1716797516_ciG5NIAj.webp"
                            alt="Visit Website"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gray-900 bg-opacity-60 rounded-2xl">
                            <h1 className="text-white mb-3 font-bold text-lg lg:text-xl text-center uppercase">
                                Visita Nuestro Sitio
                            </h1>
                            <button className="px-6 py-3 text-sm text-white transition duration-300 ease-in-out transform bg-indigo-500 border-indigo-400 border-2 rounded-full hover:scale-105 focus:outline-none font-medium">
                                Ir al Sitio Web
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
