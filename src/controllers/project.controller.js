import { Router } from "express";
import { addArtifact, addProject, addUser, getProject } from "../services/project.js";
import { isUserAuthenticated } from "../middlewares/auth.middleware.js";
const router = Router()

router.get('/project', (req, res) => res.send('adios manooo!'))
router.post('/project', addUser)
router.post('/addproject', isUserAuthenticated, addProject)
router.get('/getProject', isUserAuthenticated, getProject)


export default router