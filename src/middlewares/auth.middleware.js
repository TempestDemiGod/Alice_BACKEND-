import { verifyToken } from '../utils/generar.js'

export const isUserAuthenticated = (req, res, next) => {
  try{
  const token = req.cookies.token
  if (!token) {
    return res.status(401).send('Unauthorized')
  }
  try {
    const decodedToken = verifyToken(token)
    req.userData = decodedToken
    next()
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' })
  }}catch(err){
    console.log(err)
  }
}