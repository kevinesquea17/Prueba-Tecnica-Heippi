import mongoose from 'mongoose'
import User from './User.js';
import { ServiceSchema } from './Service.js';

const HospitalSchema = mongoose.Schema({
    isHospital: {
        type: Boolean,
        default: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    services: [ServiceSchema]
});

const Hospital = User.discriminator('Hospital', HospitalSchema);
export default Hospital;