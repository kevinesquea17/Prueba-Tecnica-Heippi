import mongoose from 'mongoose'
import User from './User.js';

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
});

const Hospital = User.discriminator('Hospital', HospitalSchema);
export default Hospital;