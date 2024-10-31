"use client"; // Agrega esta línea al inicio del archivo

import { useState } from 'react';

export default function Home() {
  const [userInfo, setUserInfo] = useState<any>(null);

  const login = async () => {
    const email = prompt('Ingrese su email:');
    const password = prompt('Ingrese su contraseña:');
    
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    if (response.ok) {
      setUserInfo(data);
    } else {
      alert(data.error);
    }
  };

  return (
    <div>
      <h1>Bienvenido a SMART Pump</h1>
      <button onClick={login}>Iniciar sesión</button>
      {userInfo && <pre>{JSON.stringify(userInfo, null, 2)}</pre>}
    </div>
  );
}
