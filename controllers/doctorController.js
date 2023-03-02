import Observation from "../models/Observation.js";
import Patient from "../models/Patient.js";

const createObservation = async (req, res) => {
    const {identification} = req.body;

    if(!req.user.isDoctor){
        const error = new Error('Usted no puede realizar esta acción.')
        return res.status(403).json({msg: error.message})
    }

    const patient = await Patient.findOne({identification});

    if(!patient){
        const error = new Error('No se encontró el paciente');
        return res.status(403).json({msg: error.message})
    }

    try {
        const observation = new Observation(req.body);
        observation.specialty = req.user.specialty;
        observation.patient = patient._id;
        observation.doctor = req.user._id;
        observation.hospital = req.user.hospital;
        await observation.save();
        return res.status(200).json({msg: 'Observación creada correctamente.'})
    } catch (error) {
        console.log(error);
        const e = new Error('No se pudo crear la observacion');
        return res.status(500).json({msg: e.message})
    }
}   

export {
    createObservation
}