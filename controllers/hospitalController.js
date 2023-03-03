import Doctor from "../models/Doctor.js";
import Hospital from "../models/Hospital.js"
import User from "../models/User.js";

const registerHospital = async (req, res) => {

    const {email, identification} = req.body;

    const existUser = await User.findOne({
        $or: [
            {email},
            {identification}
        ]
    });
    if(existUser){
        const error = new Error('Este usuario ya se encuentra registrado!');
        return res.status(403).json({msg: error.message})
    }

    try {
        const hospital = new Hospital(req.body);
        await hospital.save();
        return res.status(200).json({msg: 'Hemos enviado a tu email las instrucciones para confirmar tu cuenta.'})
    } catch (error) {
        console.log(error)
        const e = new Error('No se pudo registrar el hospital.');
        return res.status(500).json({msg: e.message})
    }
}

const registerDoctor = async (req, res) => {
    if(!req.user.isHospital){
        const error = new Error('Usted no puede realizar esta acción.')
        return res.status(500).json({msg: error.message})
    }

    const {email, identification} = req.body;

    const existUser = await User.findOne({
        $or: [
            {email},
            {identification}
        ]
    });
    if(existUser){
        const error = new Error('Este usuario ya se encuentra registrado!');
        return res.status(403).json({msg: error.message})
    }

    const doctor = new Doctor(req.body);
    doctor.hospital = req.user._id;

    try {
        await doctor.save();
        return res.status(200).json({msg: "Hemos enviado las instrucciones a tu email para confirmar tu cuenta."})
    } catch (error) {
        console.log(error)
        const e = new Error('No se pudo registrar el Doctor.')
        return res.status(500).json({msg: e.message})
    }
}

export {
    registerHospital,
    registerDoctor
}