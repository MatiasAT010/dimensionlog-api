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

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`API corriendo en http://localhost:${PORT}`);
    console.log(`  GET /api/character`);
    console.log(`  GET /api/character/:id`);
  });
}).catch(err => {
  console.error('Error conectando a la base de datos:', err.message);
  process.exit(1);
});
