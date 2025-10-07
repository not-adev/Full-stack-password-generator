import { NextRequest, NextResponse } from 'next/server'
import { connectToDb } from '@/app/db-congigration/models/connect-to-bd'
import { getIdFromToken } from '@/utils/getid'
import { SavedPasswordModel } from '@/app/db-congigration/models/saved-pssword'

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

 const entries = await SavedPasswordModel.find({ user: userId })
  .populate('user', 'email')
  return NextResponse.json({ success: true, entries })
}