import { NextResponse } from 'next/server';
import db from '../../../db';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
    const { email, password } = await req.json();
    
    // Buscar usuario existente
    const user = db.get('users').find({ email }).value();
    
    if (user) {
        // Si el usuario existe, verificar contraseña con bcrypt
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            // Incrementar balance en 100 cuando hace login
            const updatedUser = {
                ...user,
                balance: (user.balance || 0) + 100
            };
            
            db.get('users')
                .find({ email })
                .assign(updatedUser)
                .write();
                
            const { password: _, ...userWithoutPassword } = updatedUser;
            return NextResponse.json(userWithoutPassword);
        }
        return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
    }
    
    // Si no existe, crear nuevo usuario con contraseña hasheada
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        id: crypto.randomUUID(),
        email,
        password: hashedPassword,
        balance: 100,
        name: email.split('@')[0]
    };
    
    db.get('users')
        .push(newUser)
        .write();
    
    // Devolver usuario sin la contraseña hasheada
    const { password: _, ...userWithoutPassword } = newUser;
    return NextResponse.json(userWithoutPassword);
}

export async function PUT(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('id');
    if (!userId) {
        return NextResponse.json({ error: 'ID de usuario requerido' }, { status: 400 });
    }
    const { email, password } = await req.json();
    
    const user = db.get('users').find({ id: userId }).value();
    
    if (!user) {
        return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }
    
    // Actualizar usuario con nueva contraseña hasheada
    const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;
    
    const updatedUser = {
        ...user,
        email: email || user.email,
        password: hashedPassword
    };
    
    db.get('users')
        .find({ id: userId })
        .assign(updatedUser)
        .write();
    
    const { password: _, ...userWithoutPassword } = updatedUser;
    return NextResponse.json(userWithoutPassword);
} 