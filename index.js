import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import conectarDB from './config/database.js';
import HospitalRouter from './routes/hospitalRoutes.js'
import PatientRouter from './routes/patientRoutes.js'
import UserRouter from './routes/userRoutes.js'
import DoctorRouter from './routes/doctorRoutes.js'
import ObservationRouter from './routes/observationRoutes.js'


dotenv.config();
const app = express();

conectarDB();

//Midddleware
app.use(express.json());
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