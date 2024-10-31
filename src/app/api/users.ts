// src/app/api/users.ts
import { NextResponse } from 'next/server';
import { login, getUserDetails, updateUserDetails, registerUser } from '../../../src/api';

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
