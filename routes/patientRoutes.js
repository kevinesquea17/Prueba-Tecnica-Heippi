import express from 'express'
import { check } from 'express-validator';
import { registerPatient } from '../controllers/patientController.js';
import { validateFields } from '../middlewares/validateFields.js';

const router = express.Router();

router.post('/register', [
    check('identification', 'La identificacion es obligatoria').isString().not().isEmpty(),
    check('email', 'No es un email valido').isEmail(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('phone', 'El numero telefono es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('name', 'El nombre es obligatorio').isString().not().isEmpty(),
    check('address', 'La dirección es obligatorio').isString().not().isEmpty(),
    validateFields
], registerPatient)

export default router;