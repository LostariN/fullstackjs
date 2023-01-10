import jwt from 'jsonwebtoken';
import Veterinario from '../models/Veterinario.js'

const checkAuth = async (req, res, next) => {

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            const tokenJWT = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(tokenJWT, process.env.JWT_SECRET);

            req.veterinario = await Veterinario.findById(decoded.id).select("-password -token -confirmado")
            return next();
        } catch (error) {
            const err = new Error('El token no valido');
            return res.status(403).json({ msg: err.message })
        }
    }

    const err = new Error('El token no valido o no existe');
    res.status(403).json({ msg: err.message })
    next()
}

export default checkAuth;