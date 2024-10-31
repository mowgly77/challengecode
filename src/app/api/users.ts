import { NextResponse } from 'next/server';
import { login, getUserDetails, updateUserDetails, registerUser } from '../../../src/api';

export async function POST(req: Request) {
    const body = await req.json();
    
    if (body.email && body.password) {
        // Llama a login con solo req
        return login(req); 
    } else {
        return registerUser(req);
    }
}

export async function GET(req: Request) {
    // Verifica si 'id' está presente en la consulta
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('id');

    // Verifica si userId está presente antes de llamar a getUserDetails
    if (userId) {
        return getUserDetails(req);
    } else {
        return NextResponse.json({ error: 'ID de usuario no proporcionado' }, { status: 400 });
    }
}

export async function PUT(req: Request) {
    // Verifica si 'id' está presente en la consulta
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('id');

    // Verifica si userId está presente antes de llamar a updateUserDetails
    if (userId) {
        return updateUserDetails(req);
    } else {
        return NextResponse.json({ error: 'ID de usuario no proporcionado' }, { status: 400 });
    }
}
