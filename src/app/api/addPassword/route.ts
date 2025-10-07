import { NextRequest, NextResponse } from 'next/server'
import { connectToDb } from '@/app/db-congigration/models/connect-to-bd'
import { SavedPasswordModel } from '@/app/db-congigration/models/saved-pssword'
import { getIdFromToken } from '@/utils/getid'
import UserModel from '@/app/db-congigration/models/user-model'
export async function POST(req: NextRequest) {
    await connectToDb()

    const token = req.cookies.get('token')?.value
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let userId: string
    try {
        userId = getIdFromToken(token)
    } catch (err) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 403 })
    }

    const { username, password } = await req.json()
    if (!username || !password) {
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const newPassword = await SavedPasswordModel.create({
        username,
        password,
        user: userId,
    })

    await UserModel.findByIdAndUpdate(userId, {
        $push: { savedPasswords: newPassword._id },
    })

    return NextResponse.json({ success: true, entry: newPassword })
}