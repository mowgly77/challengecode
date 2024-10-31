import { login } from '../src/api'; // Ajusta la ruta según tu estructura
import db from '../src/db';
import bcrypt from 'bcrypt';

describe('API Tests', () => {
    beforeAll(() => {
        // Asegúrate de que la base de datos tenga un usuario válido para las pruebas
        const hashedPassword = bcrypt.hashSync('password123', 10); // Cambia esto según tu lógica de hash
        db.get('users').push({
            id: '1',
            email: 'user@example.com',
            password: hashedPassword,
            name: 'Test User',
            balance: 100
        }).write(); // Escribe en la base de datos simulada
    });

    it('debería iniciar sesión correctamente', async () => {
        const req = {
            json: async () => ({ email: 'user@example.com', password: 'password123' }), // Credenciales correctas
        } as Request;

        const response = await login(req);
        const responseBody = await response.json(); // Convierte la respuesta a JSON

        // Verifica que la respuesta contenga el email correcto
        expect(responseBody).toHaveProperty('email', 'user@example.com'); // Verifica el contenido
    });

    it('debería retornar un error con credenciales incorrectas', async () => {
        const req = {
            json: async () => ({ email: 'user@example.com', password: 'wrongpassword' }), // Credenciales incorrectas
        } as Request;

        const response = await login(req);
        const responseBody = await response.json(); // Convierte la respuesta a JSON

        // Verifica que la respuesta contenga un error
        expect(responseBody).toHaveProperty('error', 'Credenciales incorrectas');
    });
});
