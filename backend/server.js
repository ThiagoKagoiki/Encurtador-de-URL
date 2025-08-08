import express from 'express'
import dotenv from 'dotenv';
import db from './models/index.js'
import { postarUrl, verShortsLinks } from './controllers/authController.js';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

app.use(express.json())

app.post('/url', postarUrl)

app.get('/shortLinks', verShortsLinks)

app.get('/:codigo', async (req, res) => {
  const { codigo } = req.params;
  try {
    const registro = await db.Url.findOne({ where: { codigo } });

    if (!registro) {
      return res.status(404).send('Link não encontrado');
    }

    return res.redirect(registro.urlOriginal);
  } catch (error) {
    return res.status(500).send('Erro no servidor');
  }
});

// app.get('/consultas', verConsulta)

db.sequelize.sync()
  .then(() => {
    app.listen(PORT, () => console.log(`Servidor da clínica rodando na porta ${PORT}`));
  })
  .catch((err) => {
    console.error("Erro ao sincronizar com o banco:", err);
  });