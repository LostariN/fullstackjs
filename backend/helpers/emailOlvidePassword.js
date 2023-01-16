import nodemailer from 'nodemailer';


const emailOlvidePassword = (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    const { email, nombre, token } = datos;

    const info = transport.sendMail({
        from: "APV-Administrador de Veterinario",
        to: email,
        subject: "Reestablece tu password",
        text: "Reestablece tu password",
        html: `
            <p>Hola: ${nombre}, has solicitado reestablecer tu password</p>
            <p>Sigue el siguente link para tu nueva password: <a href="${process.env.FRONTEND_URL}/olvide-cuenta/${token}">Nueva password</a></p>
            <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>

        `
    })
    console.log("Mensaje enviado: %s", info.messageId);
}


export default emailOlvidePassword;