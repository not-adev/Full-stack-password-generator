import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import UserModel from '@/app/db-congigration/models/user-model'
import { connectToDb } from '@/app/db-congigration/models/connect-to-bd'

const JWT_SECRET = process.env.JWT_SECRET!

export async function POST(req: NextRequest) {
  await connectToDb()
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password required' }, { status: 200 })
  }

  const user = await UserModel.findOne({ email })

  if (!user || !user.password) {
    return NextResponse.json({ message: 'User not found' , redirect : '/singup'} , { status: 404 })
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    return NextResponse.json({ message: 'Invalid password' })
  }

  const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: '7d',
  })

  const response = NextResponse.json({ success: true, message: 'Login successful' , redirect : '/dashboard'})

  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  })

  return response
}