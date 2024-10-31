import { NextResponse } from 'next/server';
import { login, getUserDetails, updateUserDetails, registerUser } from '../../../src/api';

export async function POST(req: Request) {
  const body = await req.json();
  if (body.email && body.password) {
    return login(req);
  } else {
    return registerUser(req);
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('id');
  return getUserDetails(req);
}

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('id');
  return updateUserDetails(req);
}
