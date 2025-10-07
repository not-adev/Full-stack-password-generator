import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/utils/sendEmail'

// Utility to generate a 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(req: NextRequest) {
  try {
    const { email} = await req.json()
    console.log(email)

    if (!email ) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const otp = generateOTP()

    // Send email with OTP
    await sendEmail( {to : email , otp })

    return NextResponse.json({otp })
  } catch (error) {
    console.error('Error sending OTP:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
