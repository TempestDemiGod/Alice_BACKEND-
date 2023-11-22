import { Router } from "express";
import { addArtifact, getArtifact, getTema, pathArtifact} from "../services/project.js";
import { isUserAuthenticated } from "../middlewares/auth.middleware.js";
const router = Router()

router.get('/artifact', (req, res) => res.send('adios manooo!'))
router.post('/addArtifact', isUserAuthenticated, addArtifact)
router.get('/verTema/:primaryCurrency',isUserAuthenticated, getTema)
router.get('/verArtefactos/:primaryCurrency',isUserAuthenticated, getArtifact)
router.patch('/EditarArtefacto',isUserAuthenticated, pathArtifact)


export default router