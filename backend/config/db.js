import mongoose from 'mongoose'

const conectarDB = async () => {
    mongoose.set('strictQuery', true);
    try {
        const db = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const url = `${db.connection.host}:${db.connection.port}`;

        console.log(`MongoDB conectado a: ${url}`);

    } catch (error) {
        console.log(`Error ${error} `);
        process.emit(1)
    }
};

export default conectarDB;
