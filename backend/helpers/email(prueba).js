import Sib from 'sib-api-v3-sdk'


export const emailRegistro = datos => {
    const { email, nombre, token } = datos
    const client = Sib.ApiClient.instance
    const apikey = client.authentications['api-key']
    apikey.apikey = process.env.API_KEY


    const tranEmailApi = new Sib.TransactionalEmailsApi()

    const sender = {
        email: "es.espinozamaulen@gmail.com"
    }
    const receivers = {
        email: email
    }

    tranEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject: "Comprueba tu Cuenta",
        htmlContent: `
            <p>Hola: ${nombre}, comprueba tu cuenta</p>
            <p>Tu cuenta ya esta lista, solo debees comprobarla siguiendo este link: <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a></p>
            <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>

        `
    })
        .then(console.log)
        .catch(console.log)
}

export const emailOlvidePassword = datos => {
    const { email, nombre, token } = datos
    const client = Sib.ApiClient.instance
    const apikey = client.authentications['api-key']
    apikey.apikey = process.env.API_KEY


    const tranEmailApi = new Sib.TransactionalEmailsApi()

    const sender = {
        email: "es.espinozamaulen@gmail.com"
    }
    const receivers = {
        email: email
    }

    tranEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject: "Comprueba tu Cuenta",
        htmlContent: `
            <p>Hola: ${nombre}, has solicitado reestablecer tu password</p>
            <p>Sigue el siguente link para tu nueva password: <a href="${process.env.FRONTEND_URL}/olvide-cuenta/${token}">Nueva password</a></p>
            <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>

        `
    })
        .then(console.log)
        .catch(console.log)
}