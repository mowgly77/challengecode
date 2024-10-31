// src/__tests__/api.test.ts
import { login } from '../src/api';
import db from '../src/db';
import bcrypt from 'bcrypt';

describe('API Tests', () => {
    beforeAll(() => {
        const hashedPassword = bcrypt.hashSync('password123', 10);
        db.get('users').push({
            id: '1',
            email: 'user@example.com',
            password: hashedPassword,
            name: 'Test User',
            balance: 100
        }).write();
    });

    afterAll(() => {
        db.get('users').remove({ id: '1' }).write();
    });

    it('debería iniciar sesión correctamente', async () => {
        const req = {
            json: async () => ({ email: 'user@example.com', password: 'password123' }),
        } as Request;

        const response = await login(req);
        const responseBody = await response.json();

        expect(responseBody).toHaveProperty('email', 'user@example.com');
    });

    it('debería retornar un error con credenciales incorrectas', async () => {
        const req = {
            json: async () => ({ email: 'user@example.com', password: 'wrongpassword' }),
        } as Request;

        const response = await login(req);
        const responseBody = await response.json();

        expect(responseBody).toHaveProperty('error', 'Credenciales incorrectas');
    });

    it('debería retornar un error si no se proporciona un email', async () => {
        const req = {
            json: async () => ({ password: 'password123' }),
        } as Request;

        const response = await login(req);
        const responseBody = await response.json();

        expect(responseBody).toHaveProperty('error', 'Credenciales incorrectas');
    });

    it('debería retornar un error si no se proporciona una contraseña', async () => {
        const req = {
            json: async () => ({ email: 'user@example.com' }),
        } as Request;

        const response = await login(req);
        const responseBody = await response.json();

        expect(responseBody).toHaveProperty('error', 'Credenciales incorrectas');
    });
});
