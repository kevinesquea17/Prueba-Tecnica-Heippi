import express from 'express';
import { createObservation } from '../controllers/doctorController.js';
import checkAuth from '../middlewares/authMiddleware.js';
import { check } from 'express-validator';

const router = express.Router();

router.post('/create-observation', checkAuth, [
    check('observation', 'La descripción de la observacion es obligatorio').not().isEmpty(),
    check('healthCondition', 'El estado de salud es obligatorio').not().isEmpty(),
    check('specialty', 'La especialidad del medico es obligatoria').not().isEmpty(),
    check('identification', 'La identification del paciente es obligatoria').not().isEmpty()
], createObservation);


export default router;

