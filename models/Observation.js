import mongoose from 'mongoose';

export const ObservationSchema = mongoose.Schema({
    observation: {
        type: String,
        required: true
    },
    healthCondition: {
        type: String,
        required: true
    },
    specialty: {
        type: String,
        required: true
    },
    patient: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    doctor: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital'
    }
});

const Observation = mongoose.model("Observation", ObservationSchema);
export default Observation;