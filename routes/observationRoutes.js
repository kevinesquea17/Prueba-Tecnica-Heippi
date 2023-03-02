import express from 'express';
import { downloadObservation, getObservation, getObservations } from '../controllers/observationController.js';
import checkAuth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', checkAuth, getObservations)
router.get('/download-observation/:id', checkAuth, downloadObservation);
router.get('/:id', checkAuth, getObservation)


export default router;