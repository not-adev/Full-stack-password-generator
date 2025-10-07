import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!

export function getIdFromToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
    return decoded.userId
  } catch  {
   
  }
}