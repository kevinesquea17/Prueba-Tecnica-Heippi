import Observation from "../models/Observation.js";
import PDFDocument from 'pdfkit'
import fs from 'fs'



const getObservations = async (req, res) => {
    const {_id} = req.user;

    try {
        if(req.user.isDoctor){
            const observations = await Observation.find().where('doctor').equals(_id);
            return res.json(observations)
        }
        if(req.user.isHospital){
            const observations = await Observation.find().where('hospital').equals(_id);
            return res.json(observations)
        }
        if(req.user.isPatient){
            const observations = await Observation.find().where('patient').equals(_id);
            return res.json(observations)
        }  
    } catch (error) {
       const e = new Error('No se pudo obtener las observaciones');
       return res.status(500).json({msg: e.message}) 
    }
}

const getObservation = async (req, res) => {
    const {id} = req.params;
    const {_id} = req.user;
    const observation = await Observation.findById(id).populate('doctor').populate('hospital').populate('patient');

    if(!observation){
        const error = new Error('No se pudo obtener información de la observacion')
        return res.status(403).json({msg: error.message})
    }
    
    if(req.user.isPatient){
        if(observation.patient._id.toString() !== _id.toString()){
            return res.status(403).json({msg: 'Acción no valida'})
        }
    }

    if(req.user.isDoctor){
        if(observation.doctor._id.toString() !== _id.toString()){
            return res.status(403).json({msg: 'Acción no valida'})
        }
    }

    if(req.user.isHospital){
        if(observation.hospital._id.toString() !== _id.toString()){
            return res.status(403).json({msg: 'Acción no valida'})
        }
    }

    return res.status(200).json(observation)     
}

const downloadObservation = async (req, res) => {
    const {id} = req.params;
    const {_id} = req.user;

    const observation = await Observation.findById(id).populate('hospital').populate('doctor').populate('patient');

    if(!observation){
        const error = new Error('No se encontró la observacion.')
        return res.status(403).json({msg: error.message})
    }

    if(req.user.isPatient){
        if(observation.patient._id.toString() !== _id.toString()){
            return res.status(403).json({msg: 'Acción no valida'})
        }
    }

    if(req.user.isDoctor){
        if(observation.doctor._id.toString() !== _id.toString()){
            return res.status(403).json({msg: 'Acción no valida'})
        }
    }

    if(req.user.isHospital){
        if(observation.hospital._id.toString() !== _id.toString()){
            return res.status(403).json({msg: 'Acción no valida'})
        }
    }


    try {
        const doc = new PDFDocument();
        const filename = `document_${Date.now()}.pdf`;
        doc.pipe(fs.createWriteStream(filename));

        doc.fontSize(16).text(observation.hospital.name, { align: 'center'});
        doc.fontSize(14).text('Información del paciente', {align: 'center', height: 120});
        doc.fontSize(12).text(`Nombre: ${observation.patient.name}`)
        doc.fontSize(12).text(`Identificacion: ${observation.patient.identification}`)
        doc.fontSize(12).text(`Email: ${observation.patient.email}`)
        doc.fontSize(12).text(`Telefono: ${observation.patient.phone}`)
        doc.fontSize(14).text('Información de la cita', {align: 'center', height: 120});
        doc.fontSize(12).text(`Observación: ${observation.observation}`)
        doc.fontSize(12).text(`Estado de salud: ${observation.healthCondition}`)
        doc.fontSize(12).text(`Especialidad: ${observation.specialty}`)
        doc.fontSize(14).text('Información de la Doctor', {align: 'center', height: 120});
        doc.fontSize(12).text(`Nombre: ${observation.doctor.name}`)
        doc.fontSize(12).text(`Telefono: ${observation.doctor.phone}`)


        //doc.text()
        doc.pipe(res);

        doc.end();

        res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
        res.setHeader('Content-Type', 'application/pdf');
        res.download(filename, {root: '.'});
    } catch (error) {
        console.log(error);
        const e = new Error('Error generando el pdf')
        res.status(500).json({msg: e.message});
    }
}

export {
    getObservations,
    downloadObservation,
    getObservation
}