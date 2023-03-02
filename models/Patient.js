import mongoose from 'mongoose'
import User from './User.js';

export const PatientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
      type: String,
      required: true
    },
    birthdate: {
      type: Date,
      default: Date.now
    },
    isPatient: {
      type: Boolean,
      default: true
    }
});


const Patient = User.discriminator('Patient', PatientSchema);
export default Patient;