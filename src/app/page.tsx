"use client"; // Agrega esta línea al inicio del archivo

import { useState, useEffect } from 'react';

// Define la interfaz para el usuario
interface User {
    id: string; // o número, dependiendo de tu implementación
    email: string;
    password: string;
    name?: string; // Opcional
    balance?: number; // Opcional
}

export default function Home() {
    const [userInfo, setUserInfo] = useState<User | null>(null); // Define el tipo correctamente
    const [showModal, setShowModal] = useState(false);
    const [balance, setBalance] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario

        console.log('Intentando login con:', { email, password });
        
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            
            console.log('Status:', response.status);
            const data = await response.json();
            console.log('Respuesta:', data);
            
            if (response.ok) {
                setUserInfo(data); // Almacena la información del usuario
                setShowModal(true); // Muestra el modal con los detalles del usuario
                setBalance(100); // Establece un saldo de ejemplo
            } else {
                alert(data.error || 'Error en el inicio de sesión');
            }
        } catch (error) {
            console.error('Error en login:', error);
            alert('Error al conectar con el servidor');
        }
    };

    const handleUpdate = async () => {
        if (!userInfo?.id) {
            alert('No hay usuario seleccionado');
            return;
        }

        const updatedData = {
            id: userInfo.id,
            email,
            password,
            // Otros campos que quieras actualizar
        };

        try {
            const response = await fetch(`/api/users?id=${userInfo.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData)
            });

            const data = await response.json();
            console.log('Respuesta de actualización:', data);

            if (response.ok) {
                setUserInfo(data);
                alert('Detalles actualizados correctamente');
            } else {
                alert(data.error || 'Error al actualizar los detalles');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al conectar con el servidor');
        }
    };

    // Agregar función para cargar usuarios
    const loadUsers = async () => {
        try {
            const response = await fetch('/api/users');
            if (response.ok) {
                const users = await response.json();
                console.log('Usuarios cargados:', users);
                // Aquí puedes mostrar los usuarios en tu interfaz
            }
        } catch (error) {
            console.error('Error al cargar usuarios:', error);
        }
    };

    // Agregar useEffect para cargar usuarios al inicio
    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Bienvenido a Mi Aplicación</h1>
            <p className="text-lg text-gray-700">Aquí puedes iniciar sesión y gestionar tu cuenta.</p>
            
            <form className="mt-4 bg-white p-6 rounded shadow-md" onSubmit={login}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        placeholder="user@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Actualiza el estado de email
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Actualiza el estado de password
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-500"
                >
                    Iniciar Sesión
                </button>
            </form>

            {/* Modal para mostrar detalles del usuario */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow-md">
                        <h2 className="text-xl font-bold">Detalles del Usuario</h2>
                        <p>Email: {userInfo?.email}</p>
                        <p>Saldo: {balance}</p>

                        {/* Formulario para actualizar detalles */}
                        <h3 className="mt-4">Actualizar Detalles</h3>
                        <input
                            type="email"
                            placeholder="Nuevo email"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            onChange={(e) => setEmail(e.target.value)} // Actualiza el nuevo email
                        />
                        <input
                            type="password"
                            placeholder="Nueva contraseña"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            onChange={(e) => setPassword(e.target.value)} // Actualiza la nueva contraseña
                        />

                        <button
                            onClick={handleUpdate}
                            className="mt-2 bg-green-600 text-white p-2 rounded-md hover:bg-green-500"
                        >
                            Actualizar
                        </button>
                        <button
                            onClick={() => setShowModal(false)} // Cierra el modal
                            className="mt-2 ml-2 bg-red-600 text-white p-2 rounded-md hover:bg-red-500"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
