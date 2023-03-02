import express from 'express';
import { registerDoctor, registerHospital } from '../controllers/hospitalController.js';
import checkAuth from '../middlewares/authMiddleware.js';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validateFields.js';

const router = express.Router();

router.post('/register', [
    check('identification', 'La identificacion es obligatoria').isString().not().isEmpty(),
    check('email', 'No es un email valido').isEmail(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('phone', 'El numero telefono es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('address', 'La dirección es obligatoria').not().isEmpty(),
    validateFields
], registerHospital)

router.post('/register-doctor', checkAuth,  [
    check('identification', 'La identificacion es obligatoria').isString().not().isEmpty(),
    check('email', 'No es un email valido').isEmail(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('phone', 'El numero telefono es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('specialty', 'La especialidad del medico es obligatoria').not().isEmpty(),
    check('hospital', 'No es un hospital valido').not().isMongoId(),
    validateFields
], registerDoctor)

export default router;