import { User, Project, Artifact } from '../models/project.model.js';
import { encryptPassword } from '../utils/bcrypt.js';

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
	res.status(201).json(newUser)
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
	//   res.status(500).send(err)
	}
  }

  export const getArtifact = async (req, res) => {
	// try {
	// 	const id = req.userData.id
	// 	const project = await User.findById(id).populate('proyects')	
	//   	res.status(200).json(user.proyects)
	// } catch (err) {
	// 	res.send(err)
	// }
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
//   try {
// 	const id = req.userData.id
// 	const user = await User.findById(id).populate('proyects')	
//   res.status(200).json(user.proyects)
// } catch (err) {
// 	res.send(err)
// }

//   try {
// 	const { id,nombre,prompt, respuesta} = req.body
// 	const project = await Project.findById(id)
// 	const artifact = await new Artifact({
// 	nombre,
// 	  prompt,
// 	respuesta
// 	})
// 	project.artefactos.push(artifact)
// 	await project.save()
// 	await artifact.save()
// 	res.status(201).json(project)
//   } catch (err) {
// 	res.status(500).send(err)
//   }
// -----------------------------------------------------------------
	// export const getProjec = async (req, res) => {
	// 	try {
	// 		const user = await User.findById(req.userData.id).populate({
	// 			path: 'notes',
		
	// 		})
	// 		res.status(200).json(user.notes)
	// 	} catch (err) {
	// 		res.send(err)
	// 	}
	// }