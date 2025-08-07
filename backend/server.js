import express from 'express'
import dotenv from 'dotenv';
import db from './models/index.js'
import { postarUrl } from './controllers/authController.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express()
app.use(express.json())

app.post('/url', postarUrl)

db.sequelize.sync()
  .then(() => {
    app.listen(PORT, () => console.log(`Servidor da clínica rodando na porta ${PORT}`));
  })
  .catch((err) => {
    console.error("Erro ao sincronizar com o banco:", err);
  });