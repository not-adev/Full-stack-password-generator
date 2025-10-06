import bcrypt from 'bcrypt';
import { NextResponse,NextRequest } from 'next/server';
import mongoose from 'mongoose';
import UserModel from '@/app/db-congigration/models/user-model';
import { connectToDb } from '@/app/db-congigration/models/connect-to-bd';


export async function POST(req : NextRequest) {
  await connectToDb()

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.create({ email, password: hashedPassword });
   return NextResponse.json({ success: true, redirectTo: '/login' }, { status: 200});
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}