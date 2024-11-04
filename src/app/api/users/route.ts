import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Aquí puedes agregar la lógica para manejar los datos del usuario
    
    return NextResponse.json({ message: 'Usuario creado exitosamente' }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
} 