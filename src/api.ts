import db from './db';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

// Iniciar sesión
export const login = async (req: Request) => {
  const body = await req.json();
  const { email, password } = body;
  const user = db.get('users').find({ email }).value();

  if (user && bcrypt.compareSync(password, user.password)) {
    return NextResponse.json(user);
  } else {
    return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 });
  }
};

// Obtener detalles del usuario
export const getUserDetails = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('id');
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
  const body = await req.json();
  const updatedUser = db.get('users').find({ id: userId }).assign(body).write();

  return NextResponse.json(updatedUser);
};

// Registrar un nuevo usuario (para pruebas)
export const registerUser = async (req: Request) => {
  const body = await req.json();
  const { email, password } = body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  
  const newUser = { id: Date.now().toString(), email, password: hashedPassword };
  db.get('users').push(newUser).write();
  
  return NextResponse.json(newUser, { status: 201 });
};
