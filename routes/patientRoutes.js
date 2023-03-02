import express from 'express'
import { check } from 'express-validator';
import { registerPatient } from '../controllers/patientController.js';
import { validateFields } from '../middlewares/validateFields.js';

const router = express.Router();

router.post('/register', [
    check('name', 'El nombre es obligatorio').isString().not().isEmpty(),
    check('address', 'La dirección es obligatorio').isString().not().isEmpty(),
    validateFields
], registerPatient)

export default router;