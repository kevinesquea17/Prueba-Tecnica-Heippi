import express from 'express'
import { confirm, forgotPassword, login, newPassword, resetPassword } from '../controllers/userController.js';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validateFields.js';

const router = express.Router();

router.post('/login', [
    check('identification', 'La identificación es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').isString().not().isEmpty(),
    validateFields
], login)

router.get('/confirm/:token', confirm)

router.post('/forgot-password', [
    check('email', 'No es un email valido').isEmail(),
    check('email', 'El email es obligatorio.').not().isEmpty(),
    validateFields
], forgotPassword)

router.get('/reset-password/:token', resetPassword)

router.post('/reset-password/:token', [
    check('password', 'Debes ingresar una nueva contraseña.').isString().not().isEmpty(),
    validateFields
], newPassword)


export default router;

