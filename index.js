import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path';
import {fileURLToPath} from 'url';
import conectarDB from './config/database.js';
import HospitalRouter from './routes/hospitalRoutes.js'
import PatientRouter from './routes/patientRoutes.js'
import UserRouter from './routes/userRoutes.js'
import DoctorRouter from './routes/doctorRoutes.js'
import ObservationRouter from './routes/observationRoutes.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();
const app = express();

conectarDB();

//Midddleware
app.use(express.json());
app.use('/public', express.static(`${__dirname}/pdfs`));
app.use(cors())

app.use('/api/hospital', HospitalRouter)
app.use('/api/patient', PatientRouter)
app.use('/api/user', UserRouter)
app.use('/api/doctor', DoctorRouter)
app.use('/api/observations', ObservationRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
})