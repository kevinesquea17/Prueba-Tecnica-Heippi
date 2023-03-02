import mongoose from 'mongoose'
import { ObservationSchema } from './Observation.js';
import User from './User.js';


const DoctorSchema = mongoose.Schema({
    isDoctor: {
        type: Boolean,
        default: true
    },
    name: {
        type: String,
        required: true
    },
    specialty: {
        type: String,
        required: true
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital'
    }
})

const Doctor = User.discriminator('Doctor', DoctorSchema);
export default Doctor;