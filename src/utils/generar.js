import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    "chileno123",
    {
      expiresIn: '1h',
    }
  )
  return token
}

export const verifyToken = (token) => {
  return jwt.verify(token, "chileno123")
}
