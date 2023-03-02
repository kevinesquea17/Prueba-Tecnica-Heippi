import User from "../models/User.js";
import sendMailPassword from "../utils/SendMailPassword.js";
import generarJWT from "../utils/generateJWT.js";
import generateToken from "../utils/generateToken.js";


const login = async (req, res) => {
    const {identification, password} = req.body;
    const user = await User.findOne({identification});

    if(!user){
        const error = new Error('No se encontró al usuario')
        return res.status(403).json({msg: error.message});
    }

    if(!user.confirmed){
        const error = new Error('Su cuenta aún no ha sido confirmada');
        return res.status(403).json({msg: error.message});
    }

    if(await user.checkPassword(password)){
        res.json({
            _id: user._id,
            identification: user.identification,
            email: user.email,
            token: generarJWT(user._id)
        })
    }else{
        const error = new Error("The password is incorrect!");
        return res.status(403).json({msg: error.message}); 
    }

}

const confirm = async (req, res) => {
    const {token} = req.params;
    const userConfirmed = await User.findOne({token})

    if(!userConfirmed){
        const error = new Error('Token no valido!');
        return res.status(500).json({msg: error.message})
    }

    try {
        userConfirmed.token = null;
        userConfirmed.confirmed = true;
        await userConfirmed.save();
        return res.status(200).json({msg: 'Usuario confirmado correctamente'});
    } catch (error) {
        console.log(error);
        const e = new Error('Error al confirmar al usuario!')
        return res.status(500).json({msg: e.message})
    }
}

const forgotPassword = async (req, res) => {
    const {email} = req.body;

    try {
        const user = await User.findOne({email});
        if(!user){
            const error = new Error('No existe ningun usuario con este email.')
            return res.status(403).json({msg: error.message})
        }
        user.token = generateToken();
        await user.save();
        sendMailPassword({
            email: user.email,
            name: user.name,
            token: user.token
        })
        res.status(200).json({msg: 'Hemos enviado las instrucciones a tu e-mail.'})
    } catch (error) {
        console.log(error);
    }
}

const resetPassword = async (req, res) => {
    const {token} = req.params;
    const user = await User.findOne({token});

    if(user){
        res.status(200).json({msg: 'Token valido'})
    }else{
        const error = new Error('El token no es valido');
        res.status(403).json({msg: error.message})
    }
}

const newPassword = async (req, res) => {
    const {token} = req.params;
    const {password} = req.body;

    const user = await User.findOne({token});

    if(!user){
        return res.status(403).json({msg: "Ha ocurrido un error!"})
    }

    try {
        user.token = null;
        user.password = password;
        user.save();
        return res.status(200).json({msg: 'Password modificado correctamente.'})
    } catch (error) {
        console.log(error)
        const e = new Error('No se pudo realizar la modificación');
        return res.status(500).json({msg: e.message})
    }
}

export {
    login,
    confirm,
    forgotPassword,
    resetPassword,
    newPassword
}