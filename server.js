import { app } from './app.js';
import mongoose from 'mongoose';

process.loadEnvFile();

const PORT = process.env.PORT || 3000;

const USERNAME = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;

async function conectarDB () {
  try {
    await mongoose.connect(
      `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.qmh3u3l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log('Conectado a la base de datos 💚');
  } catch (err) {
    console.log('Error al conectar a la base de datos ❌');
  }
}
conectarDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
