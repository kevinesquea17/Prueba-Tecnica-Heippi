import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import generateToken from '../utils/generateToken.js';


const userSchema = mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true
    },
    identification: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
      type: String,
      required: true
    },
    token: {
        type: String,
        default: generateToken()
    },
    confirmed: {
        type: Boolean,
        default: false
    }
  }, {
    timestamps: true
});

userSchema.pre('save', async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

  
const User = mongoose.model('User', userSchema);
export default User;
