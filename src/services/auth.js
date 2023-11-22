import { User } from "../models/project.model.js"
import { comparePassword, encryptPassword } from "../utils/bcrypt.js"
import { generateToken } from "../utils/generar.js"

const verificar = (password, newPassword) => {
	return password == newPassword
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) return res.status(404).json({ message: 'Wrong credentials' })
    const isMatch = await comparePassword(password, user.password) 
  // verificar(password, user.password) 
    if (!isMatch) return res.status(404).json({ message: 'Wrong credentials' })
    const token = generateToken(user)
    res
      .status(200)
      .cookie('token', token, {
        maxAge: 3600000 * 2,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      .send(user.email)
  } catch (err) {
    res.status(500).send({ err })
  }
}

export const logout = (req, res) => {
  try {
    res
      .clearCookie('token', { sameSite: 'none', secure: true })
      .status(200)
      .send('Cookie removed')
  } catch (err) {
    res.status(500).send({ err })
  }
}