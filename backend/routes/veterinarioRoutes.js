import express from 'express';
import { registrar, perfil, confirmar, autenticar, restaurarPass, comprobarToken, nuevoPass } from '../controllers/veterinarioControllers.js'
import checkAuth from '../middleware/authMiddleware.js'
const router = express.Router();

router.post('/', registrar)
router.get('/confirmar/:token', confirmar)
router.post('/login', autenticar)
router.post('/restaurarPass', restaurarPass)
router.get('/restaurarPass/:token', comprobarToken)
router.post('/restaurarPass/:token', nuevoPass)

// router.route('/restaurarPass/:token').get(comprobarToken).post(nuevoPass)


router.get('/perfil', checkAuth, perfil)
export default router;