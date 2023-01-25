import Paciente from '../models/Paciente.js'

const agregarPaciente = async (req, res) => {
    const paciente = new Paciente(req.body)
    paciente.veterinario = req.veterinario.id
    try {
        const pacienteAlmacenado = await paciente.save();
        res.json(pacienteAlmacenado)
    } catch (error) {
        console.log(error);
    }
}
const obtenerPacientes = async (req, res) => {

    const pacientes = await Paciente.find().where("veterinario").equals(req.veterinario.id)
    // console.log(req.veterinario);
    res.json(pacientes)
}
const obtenerPaciente = async (req, res) => {
    const paciente = await Paciente.findById(req.params.id)

    // console.log(paciente.veterinario._id.toString());
    // console.log(req.veterinario.id);
    if (!paciente) {
        return res.status(404).json({ msg: 'Mascota no se encuentra' })
    }
    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.json({ msg: 'Accion no valida' })
    }


    res.json({ paciente })

}
const actualizarPaciente = async (req, res) => {
    const paciente = await Paciente.findById(req.params.id)

    if (!paciente) {
        return res.status(404).json({ msg: 'Mascota no se encuentra' })
    }
    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.json({ msg: 'Accion no valida' })
    }
    paciente.nombre = req.body.nombre || paciente.nombre;
    paciente.propietario = req.body.propietario || paciente.propietario;
    paciente.email = req.body.email || paciente.email;
    paciente.fecha = req.body.fecha || paciente.fecha;
    paciente.sintomas = req.body.sintomas || paciente.sintomas;

    try {
        const pacienteActualizado = await paciente.save()
        res.json(pacienteActualizado)
    } catch (error) {
        console.log(error);
    }


}
const eliminarPaciente = async (req, res) => {
    const paciente = await Paciente.findById(req.params.id)

    if (!paciente) {
        return res.status(404).json({ msg: 'Mascota no se encuentra o no existe' })
    }
    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.json({ msg: 'Accion no valida' })
    }

    try {
        const pacienteEliminado = await paciente.deleteOne()
        res.json({ paciente: pacienteEliminado, msg: 'Eliminado correctamente' })
    } catch (error) {
        console.log(error);
    }
}

export {
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
}