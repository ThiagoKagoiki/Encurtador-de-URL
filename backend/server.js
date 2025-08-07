import express from 'express'
import dotenv from 'dotenv';
import db from './models/index.js'
import { postarUrl } from './controllers/authController.js';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json())

app.post('/url', postarUrl)

db.sequelize.sync()
  .then(() => {
    app.listen(PORT, () => console.log(`Servidor da clínica rodando na porta ${PORT}`));
  })
  .catch((err) => {
    console.error("Erro ao sincronizar com o banco:", err);
  });