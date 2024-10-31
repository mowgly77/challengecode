# Challenge Code

## Descripción

Challenge Code es una aplicación web que permite a los usuarios iniciar sesión, verificar su saldo y actualizar sus detalles personales. Está desarrollada utilizando Node.js, Next.js y LowDB, ofreciendo una API para gestionar las operaciones del usuario.

## Características

- Iniciar sesión mediante correo electrónico y contraseña.
- Verificar el saldo del usuario.
- Actualizar detalles del usuario.
- API RESTful para manejar las operaciones de usuario.

## Tecnologías Utilizadas

- **Frontend**: React (Next.js)
- **Backend**: Node.js
- **Base de Datos**: LowDB
- **Autenticación**: bcrypt para encriptar contraseñas.

## URLs

- **Aplicación en Vercel**: [challengecode-eight.vercel.app](https://challengecode-eight.vercel.app/)
- **API**: 
  - `GET /api/test` - Verifica que la API está funcionando.
  - `POST /api/users` - Inicia sesión o registra un nuevo usuario.
  - `GET /api/users?id={userId}` - Obtiene detalles del usuario.
  - `PUT /api/users?id={userId}` - Actualiza los detalles del usuario.

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/mowgly77/challenge-code.git
   cd challenge-code
