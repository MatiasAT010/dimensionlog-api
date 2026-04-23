const express = require('express');
const cors = require('cors');
const { initDb } = require('./db/database');
const characterRoutes = require('./routes/character.routes');
const { PORT } = require('./config/config');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', characterRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

async function start() {
  let retries = 10;
  while (retries > 0) {
    try {
      await initDb();
      app.listen(PORT, () => {
        console.log(`API corriendo en http://localhost:${PORT}`);
        console.log(`  GET /api/character`);
        console.log(`  GET /api/character/:id`);
      });
      return;
    } catch (err) {
      retries--;
      console.log(`Base de datos no lista, reintentando en 5s... (${retries} intentos restantes)`);
      await new Promise(res => setTimeout(res, 5000));
    }
  }
  console.error('No se pudo conectar a la base de datos');
  process.exit(1);
}

start();