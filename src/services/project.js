import { User, Project, Artifact } from '../models/project.model.js';
import { encryptPassword } from '../utils/bcrypt.js';
import { generateToken } from '../utils/generar.js';

export const addUser = async (req, res) => {
	try{
		console.log('Entré :D')
	const { nombre, apellido, email, password } = req.body;
	const userExists = await User.findOne({ email: email.toLowerCase() })
	console.log('Entré01 :D')
	if (userExists) return res.status(400).json({ message: 'User exists' })
	const encryptedPassword = await encryptPassword(password)
	const newUser = new User({
		nombre,
		apellido,
		email: email.toLowerCase(),
		password: encryptedPassword
})
await newUser.save()
console.log(newUser)
const token = generateToken(newUser)
console.log(token)
	res.status(201).cookie('token', token, {
        maxAge: 3600000 * 2,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      }).json(newUser)
} catch (err) {
	res.json(err)
}
}


export const addProject = async (req, res) => {
  try {
  	const { nombre, tema, apiKey, description } = req.body
		const id = req.userData.id
		console.log( id)
    const user = await User.findById(id)	
    const project = await new Project({
	nombre,
    tema,
	apiKey,
	description
    })
    user.proyects.push(project)
    await user.save()
    await project.save()
    res.status(201).json(project)
  } catch (err) {
    res.status(500).send(err)
  }
}

export const addArtifact = async (req, res) => {
	try {
	  const { id,nombre,prompt, respuesta} = req.body
	  const project = await Project.findById(id)
	  const artifact = await new Artifact({
	  nombre,
  	  prompt,
      respuesta
	  })
	  project.artefactos.push(artifact)
	  await project.save()
	  await artifact.save()
	  res.status(201).json(artifact)
	} catch (err) {
	  res.status(500).send(err)
	}
  }

  export const getProject = async (req, res) => {
	try {
		const id = req.userData.id
		const user = await User.findById(id).populate('proyects')	
	  res.status(200).json(user.proyects)
	} catch (err) {
		res.send(err)
	}
  }
  export const pathArtifact = async (req, res) => {
	try {
	  const datosActualizados = req.body
	  console.log(datosActualizados.id)
	  console.log(datosActualizados.respuesta)
	  const artefacto = await Artifact.findById(datosActualizados.id)
	  const respuesta = datosActualizados.respuesta
	  const dato  = {
		respuesta
	  }
	  console.log(dato)
	Object.assign(artefacto, dato)
	  await artefacto.save()
	  console.log(artefacto)
	  res.status(202).send(artefacto)
	} catch (err) {
	  res.send(err)
	}
}
  export const getArtifact = async (req, res) => {
	try {
		const id = req.params.primaryCurrency
		console.log('id -- '+id)
		const project = await Project.findById(id).populate('artefactos')
	  	res.status(200).json(project.artefactos)
	} catch (err) {
		res.send(err)
	}
  }

  export const getTema = async (req, res) => {
	try {
		console.log(req.params.primaryCurrency);
		const hola = req.params.primaryCurrency
		// const {id} = req.body
		// console.log(typeof(id))
		console.log('id ..  '+ hola)
		const project = await Project.findById(hola)	
		res.status(200).json(project)
	} catch (err) {
		res.send(err)
	}
  }

  export const deleteProject = async (req, res) => {
		try {
		  const { id } = req.body
		  console.log('este es el id gente --   '+ id)
		  console.log('este es el body gente --   '+ req.body.id)
		  if (!id) {
			return res.status(400).send('Missing id')
		  }
		  await Project.deleteOne({ _id: id })
		  res.status(202).send()
		} catch (err) {
		  res.send(err)
		}
  }

  
  