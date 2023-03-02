import nodemailer from 'nodemailer'


const sendMailPassword = (data) => {
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
        subject: 'Recupera tu contraseña en nuestra aplicación.',
        text: "Recupera tu contraseña en nuestra aplicación.",
        html: `<p>Hola ${name}, solicitaste recuperar tu contraseña.</p>
                <p>Solo debes dar click en el siguiente enlace:
                <a href="http://localhost:3000/api/user/confirm/${token}" >Recuperar contraseña</a></p>
                <p>Si tu no lo solicitaste esta recuperación, haz caso omiso</p>        
        `

    })
}

export default sendMailPassword;