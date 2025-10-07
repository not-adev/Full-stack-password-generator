import { NextRequest, NextResponse } from 'next/server'
import { connectToDb } from '@/app/db-congigration/models/connect-to-bd'
import { getIdFromToken } from '@/utils/getid'
import UserModel from '@/app/db-congigration/models/user-model'

export async function GET(req: NextRequest) {
  await connectToDb()
  const token = req.cookies.get('token')?.value
  console.log(token)
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let userId: string
  try {
    userId = getIdFromToken(token)
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 })
  }
const user = await UserModel.findById(userId).populate('SavedPasswords')

if (!user) {
  throw new Error('User not found')
}

const savedPasswords = user.SavedPasswords


  return NextResponse.json({ success: true,entries :savedPasswords})
}