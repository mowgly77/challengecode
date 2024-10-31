import db from './db';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

// Definición de la interfaz para el usuario
interface User {
    id: string; // o número, dependiendo de tu implementación
    email: string;
    password: string;
    name?: string; // Opcional
    balance?: number; // Opcional
}

// Iniciar sesión
export const login = async (req: Request) => {
  const body: { email?: string; password?: string } = await req.json();
  console.log('Login request body:', body);

  // Verificar si se proporcionaron email y password
  if (!body.email || !body.password) {
      return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 });
  }

  const user = db.get('users').find({ email: body.email }).value();
  console.log('User found:', user);

  if (user && bcrypt.compareSync(body.password, user.password)) {
      return NextResponse.json({ email: user.email });
  } else {
      return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 });
  }
};

// Obtener detalles del usuario
export const getUserDetails = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('id');

    if (!userId) {
        return NextResponse.json({ error: 'ID de usuario no proporcionado' }, { status: 400 });
    }

    // Busca el usuario por ID
    const user = db.get('users').find({ id: userId }).value();

    if (user) {
        return NextResponse.json(user);
    } else {
        return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }
};

// Actualizar detalles del usuario
export const updateUserDetails = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('id');

    if (!userId) {
        return NextResponse.json({ error: 'ID de usuario no proporcionado' }, { status: 400 });
    }

    const body = await req.json();
    const existingUser = db.get('users').find({ id: userId });

    if (!existingUser.value()) {
        return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    existingUser.assign(body).write(); // Asegúrate de que el método write esté disponible

    return NextResponse.json(existingUser.value());
};

// Registrar un nuevo usuario
export const registerUser = async (req: Request) => {
    const body: { email: string; password: string; name?: string } = await req.json();
    const { email, password, name } = body;

    const existingUser = db.get('users').find({ email }).value();
    if (existingUser) {
        return NextResponse.json({ error: 'El usuario ya existe' }, { status: 409 });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser: User = { id: Date.now().toString(), email, password: hashedPassword, name };
    db.get('users').push(newUser).write(); // Aquí se usa push correctamente

    return NextResponse.json(newUser, { status: 201 });
};

export async function GET() {
  return NextResponse.json({ message: "API is working!" });
}