import nodemailer from 'nodemailer'

const emailRegister = (data) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    const {name, email, token} = data;

    //Enviar Mail

    const info = transport.sendMail({
        from: "Aplicacion de Hospitales",
        to: email,
        subject: 'Comprueba tu cuenta en Hospital APP.',
        text: "Comprueba tu cuenta en Hospital APP.",
        html: `<p>Hola ${name}, comprueba tu cuenta en nuestra aplicación</p>
                <p>Tu cuenta ya está lista, solo debes comprobarla en el siguiente enlace:
                <a href="http://localhost:3000/api/user/confirm/${token}" >Comprobar cuenta</a></p>
                <p>Si tu no creaste está cuenta, haz caso omiso</p>        
        `

    })
}

export default emailRegister;