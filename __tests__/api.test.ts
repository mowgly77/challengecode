import { login } from '../src/api';

// Mock de la interfaz Request de Next.js
const mockRequest = (body: any) => {
  return {
    json: jest.fn().mockResolvedValue(body), // Mock para el método json
  } as unknown as Request; // Forzar el tipo a Request
};

describe('API Tests', () => {
  it('debería iniciar sesión correctamente', async () => {
    const req = mockRequest({
      email: 'user@example.com',
      password: 'password', // La contraseña en texto plano
    });

    const response = await login(req); // Aquí se usa req que simula el Request de Next.js

    // Verifica que la respuesta contenga el email correcto
    const responseBody = await response.json(); // Convierte la respuesta a JSON
    expect(responseBody).toHaveProperty('email', 'user@example.com'); // Verifica el contenido
  });

  it('debería retornar un error con credenciales incorrectas', async () => {
    const req = mockRequest({
      email: 'wrong@example.com',
      password: 'wrongpassword',
    });

    const response = await login(req); // Aquí se usa req que simula el Request de Next.js

    // Verifica que se retorne un error
    const responseBody = await response.json(); // Convierte la respuesta a JSON
    expect(responseBody).toHaveProperty('error', 'Credenciales incorrectas');
  });
});
