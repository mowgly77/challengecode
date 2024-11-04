// src/app/api/users.ts
import { NextResponse } from 'next/server';
import { login, getUserDetails, updateUserDetails, registerUser } from '../../../src/api';
import  db  from '../../db';

export async function POST(req: Request) {
    const body = await req.json();
    console.log('POST /api/users called');
    
    if (body.email && body.password) {
        return login(req); 
    } else {
        return registerUser(req);
    }
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('id');

    if (userId) {
        return getUserDetails(req);
    } else {
        const users = db.get('users');
        console.log(users, 'users');
        return NextResponse.json(users);
    }
}

export async function PUT(req: Request) {
    const body = await req.json();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('id') || body.id;

    if (!userId) {
        return NextResponse.json({ error: 'ID de usuario no proporcionado' }, { status: 400 });
    }

    try {
        return await updateUserDetails(req);
    } catch (error) {
        return NextResponse.json({ error: 'Error al actualizar usuario' }, { status: 500 });
    }
}
