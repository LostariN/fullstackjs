import nodemailer from 'nodemailer';


const emailRegistro = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    const { email, nombre, token } = datos;

    const info = await transport.sendMail({
        from: '"APV - Administrador Pacientes Veterinaria" <apv@correo.com>',
        to: email,
        subject: "Comprueba tu Cuenta",
        text: "Comprueba tu cuenta",
        html: `
            <p>Hola: ${nombre}, comprueba tu cuenta</p>
            <p>Tu cuenta ya esta lista, solo debees comprobarla siguiendo este link: <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a></p>
            <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>

        `
    })
    console.log("Mensaje enviado: %s", info.messageId);

}


export default emailRegistro;