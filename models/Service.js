import mongoose from 'mongoose';

export const ServiceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const Service = mongoose.model("Service", ServiceSchema);
export default Service;