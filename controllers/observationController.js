import Observation from "../models/Observation.js";
import PDFDocument from 'pdfkit'
import fs from 'fs'
import generateToken from "../utils/generateToken.js";


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


    try {
        const doc = new PDFDocument();
        const filename = `document_${generateToken()}.pdf`;
        doc.pipe(fs.createWriteStream(filename));

        doc.fontSize(16).text(observation.observation);
        doc.fontSize(12).text(observation.observation);
        doc.text()
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