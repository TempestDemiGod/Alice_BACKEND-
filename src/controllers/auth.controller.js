import { Router } from "express";
import { addArtifact, addProject, addUser } from "../services/project.js";
import { isUserAuthenticated } from "../middlewares/auth.middleware.js";
import { login } from "../services/auth.js";

const router = Router()

router.get('/login', (req, res) => res.send('adios manooo!'))
router.post('/register', addUser)
router.post('/login',  login)

export default router