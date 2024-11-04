// src/app/api/users.ts
import { NextResponse } from 'next/server';
import { login, getUserDetails, updateUserDetails, registerUser } from '../../../src/api';
import db from '../../../src/db';
import crypto from 'crypto';

export async function POST(req: Request) {
    const body = await req.json();
    console.log('POST /api/users called');
    
    // Buscar si el usuario ya existe
    const existingUser = db.get('users').find({ email: body.email }).value();
    
    if (existingUser) {
        // Si existe, verificar contraseña y devolver usuario
        if (existingUser.password === body.password) {
            return NextResponse.json(existingUser);
        }
        return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 });
    } else {
        // Si no existe, crear nuevo usuario
        const newUser = {
            id: crypto.randomUUID(),
            email: body.email,
            password: body.password,
            balance: 100
        };
        
        db.get('users')
            .push(newUser)
            .write();
            
        return NextResponse.json(newUser);
    }
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('id');

    if (userId) {
        return getUserDetails(req);
    } else {
        return NextResponse.json({ error: 'ID de usuario no proporcionado' }, { status: 400 });
    }
}

export async function PUT(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('id');

    if (userId) {
        return updateUserDetails(req);
    } else {
        return NextResponse.json({ error: 'ID de usuario no proporcionado' }, { status: 400 });
    }
}
