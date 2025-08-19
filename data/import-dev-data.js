import mongoose from 'mongoose';
import fs from 'fs/promises';
import { Tour } from '../models/tourModel.js';

process.loadEnvFile();

const USERNAME = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;

async function conectarDB() {
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

async function readFile() {
  try {
    const tours = await fs.readFile('./data/tours-simple.json', 'utf-8');
    await Tour.create(JSON.parse(tours));
    console.log('Datos importados correctamente 💚');
  } catch (error) {
    console.log(error);
  }
  process.exit();
}
async function deleteData() {
  try {
    await Tour.deleteMany();
    console.log('Datos eliminados correctamente 💚');
  } catch (error) {
    console.log(error);
  }
  process.exit();
}

if (process.argv[2] === '--import') {
  readFile();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
