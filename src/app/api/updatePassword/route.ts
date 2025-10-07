import { NextRequest, NextResponse } from 'next/server'
import { connectToDb } from '@/app/db-congigration/models/connect-to-bd'
import { getIdFromToken } from '@/utils/getid'
import { SavedPasswordModel } from '@/app/db-congigration/models/saved-pssword'
export async function PUT(req: NextRequest) {
  await connectToDb()

  const token = req.cookies.get('token')?.value
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let userId: string
  try {
    userId = getIdFromToken(token)
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 })
  }

  const { passwordId, username, password } = await req.json()

  if (!passwordId || (!username && !password)) {
    return NextResponse.json({ error: 'Missing update fields' }, { status: 400 })
  }

  const entry = await SavedPasswordModel.findOneAndUpdate(
    { _id: passwordId, user: userId },
    { ...(username && { username }), ...(password && { password }) },
    { new: true }
  )

  if (!entry) {
    return NextResponse.json({ error: 'Password not found or unauthorized' }, { status: 404 })
  }

  return NextResponse.json({ success: true, message: 'Password updated successfully', entry })
}