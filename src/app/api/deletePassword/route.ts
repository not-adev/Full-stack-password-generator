import { NextRequest, NextResponse } from 'next/server'
import { connectToDb } from '@/app/db-congigration/models/connect-to-bd'
import { SavedPasswordModel } from '@/app/db-congigration/models/saved-pssword'
import UserModel from '@/app/db-congigration/models/user-model'
import { getIdFromToken } from '@/utils/getid'
export async function DELETE(req: NextRequest) {
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

  const { passwordId } = await req.json()
  if (!passwordId) {
    return NextResponse.json({ error: 'Missing password ID' }, { status: 400 })
  }

  const entry = await SavedPasswordModel.findOneAndDelete({
    _id: passwordId
  })

  if (!entry) {
    return NextResponse.json({ error: 'Password not found or unauthorized' }, { status: 404 })
  }

  await UserModel.findByIdAndUpdate(userId, {
    $pull: { savedPasswords: passwordId },
  })

  return NextResponse.json({ success: true, message: 'Password deleted successfully' })
}