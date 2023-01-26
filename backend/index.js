import express from 'express';
import dotenv from 'dotenv'
import conectarDB from './config/db.js'
import veterinarioRoutes from './routes/veterinarioRoutes.js'
import pacientesRoutes from './routes/pacienteRoutes.js'
import cors from 'cors'

const app = express();
dotenv.config();
conectarDB();

// const dominiosPermitidos = [process.env.FRONTEND_URL]

// const corsOptions = {
//     origin: function (origin, callback) {
//         if (dominiosPermitidos.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error('No permitido por CORS****'))
//         }
//     },
// }

// app.use(cors({ origin: '*' }))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use(express.json());
app.use('/api/veterinarios', veterinarioRoutes)
app.use('/api/pacientes', pacientesRoutes)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`servidor en puerto ${PORT}`);
})