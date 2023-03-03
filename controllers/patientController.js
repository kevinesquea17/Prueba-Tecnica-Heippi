import Patient from "../models/Patient.js"
import User from "../models/User.js";
import emailRegister from "../utils/sendMailRegister.js";


const registerPatient = async (req, res) => {

    const {identification} = req.body;

    const existUser = await User.findOne({identification});
    if(existUser){
        const error = new Error('Este usuario ya se encuentra registrado!');
        return res.status(403).json({msg: error.message})
    }

    try {
        const patient = new Patient(req.body);
        await patient.save();

        //Enviar mail
        emailRegister({
            name: patientSaved.name,
            email: patientSaved.email,
            token: patientSaved.token
        })

        return res.status(200).json({msg: 'Hemos enviado a tu email las instrucciones para confirmar tu cuenta.'})
    } catch (error) {
        const e = new Error('No se pudo registrar el paciente.');
        return res.status(500).json({msg: e.message})
    }
}

export {
    registerPatient
}