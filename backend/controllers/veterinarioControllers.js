import Veterinario from '../models/Veterinario.js'
import generarJWT from '../helpers/generarJWT.js'
import generarId from '../helpers/generarIDToken.js';


const registrar = async (req, res) => {

    const { email } = req.body;
    const usuarioExiste = await Veterinario.findOne({ email: email })

    if (usuarioExiste) {
        const error = new Error('El usuario ya esta registrado');
        return res.status(400).json({ msg: error.message })
    }

    try {
        const veterinario = new Veterinario(req.body)
        const veterinarioGuardado = await veterinario.save();
        res.json(veterinarioGuardado)
    } catch (error) {
        console.log(error);
    }

}
const perfil = (req, res) => {
    const { veterinario } = req;

    res.json({ perfil: veterinario })
}
const confirmar = async (req, res) => {
    const { token } = req.params;

    const usuarioConfirmado = await Veterinario.findOne({ token: token })
    if (!usuarioConfirmado) {
        const error = new Error('Usuario No Existente');
        return res.status(400).json({ msg: error.message })
    }

    try {
        usuarioConfirmado.confirmado = true;
        usuarioConfirmado.token = null;
        await usuarioConfirmado.save()
        res.json({
            msg: "Usuario encontrado correctamente",
            user: usuarioConfirmado
        })
    } catch (error) {
        console.log(error);
    }
}
const autenticar = async (req, res) => {

    const { nombre, password, email } = req.body;
    const usuarioEncontrado = await Veterinario.findOne({ email })

    if (!usuarioEncontrado) {
        const err = new Error('Usuario no encontrado');
        return res.status(403).json({ msg: err.message })
    }
    if (!usuarioEncontrado.confirmado) {
        const err = new Error('Usuario no Confirmado');
        return res.status(403).json({ msg: err.message })

    }
    try {
        if (await usuarioEncontrado.comprobarPass(password)) {

            res.json({ token: generarJWT(usuarioEncontrado.id) })
        } else {
            const err = new Error('PASSWORD INCORRECTO');
            return res.status(403).json({ msg: err.message })

        }
    } catch (error) {
        console.log(error);
    }
}
const restaurarPass = async (req, res) => {
    const { email } = req.body
    const existeVeterinario = await Veterinario.findOne({ email })
    if (!existeVeterinario) {
        const err = new Error('Usuario no encontrado');
        return res.status(403).json({ msg: err.message })
    }
    try {
        existeVeterinario.token = generarId();
        await existeVeterinario.save();
        res.json({ msg: 'Email enviado' })
    } catch (error) {

    }
}
const comprobarToken = async (req, res) => {
    const { token } = req.params;
    const tokenValido = await Veterinario.findOne({ token })

    if (tokenValido) {
        res.json({ msg: "token valido" })
    } else {
        const err = new Error('token no encontrado');
        return res.status(403).json({ msg: err.message })
    }

}
const nuevoPass = async (req, res) => {
    const { token } = req.params
    const { password } = req.body

    const veterinario = await Veterinario.findOne({ token })
    if (!veterinario) {
        const err = new Error('usuario no encontrado');
        return res.status(403).json({ msg: err.message })
    }
    try {
        veterinario.token = null;
        veterinario.password = password;
        await veterinario.save();
        res.json({ msg: veterinario })
    } catch (error) {
        console.log(error);
    }
}
export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    restaurarPass,
    nuevoPass,
    comprobarToken

}
