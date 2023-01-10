import express from 'express';
import dotenv from 'dotenv'
import conectarDB from './config/db.js'
import veterinarioRoutes from './routes/veterinarioRoutes.js'
import pacientesRoutes from './routes/pacienteRoutes.js'

const app = express();
dotenv.config();
conectarDB();
app.use(express.json());
app.use('/api/veterinarios', veterinarioRoutes)
app.use('/api/pacientes', pacientesRoutes)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`servidor en puerto ${PORT}`);
})