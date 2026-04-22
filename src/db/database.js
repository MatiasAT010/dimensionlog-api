const { Pool } = require('pg');
const { DB } = require('../config/config');

const pool = new Pool(DB);

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS characters (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      status TEXT NOT NULL,
      species TEXT NOT NULL,
      type TEXT,
      gender TEXT NOT NULL,
      origin_name TEXT,
      origin_url TEXT,
      location_name TEXT,
      location_url TEXT,
      image TEXT,
      episode TEXT[],
      url TEXT,
      created TEXT
    )
  `);

  const { rows } = await pool.query('SELECT COUNT(*) FROM characters');
  if (parseInt(rows[0].count) === 0) {
    await seed();
  }

  console.log('Base de datos lista');
}

async function seed() {
  const characters = [
    { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human', type: '', gender: 'Male', origin_name: 'Earth (C-137)', origin_url: '', location_name: 'Citadel of Ricks', location_url: '', image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg', episode: ['https://rickandmortyapi.com/api/episode/1', 'https://rickandmortyapi.com/api/episode/2'], url: 'https://rickandmortyapi.com/api/character/1', created: '2017-11-04T18:48:46.250Z' },
    { id: 2, name: 'Morty Smith', status: 'Alive', species: 'Human', type: '', gender: 'Male', origin_name: 'unknown', origin_url: '', location_name: 'Citadel of Ricks', location_url: '', image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg', episode: ['https://rickandmortyapi.com/api/episode/1', 'https://rickandmortyapi.com/api/episode/2'], url: 'https://rickandmortyapi.com/api/character/2', created: '2017-11-04T18:50:21.651Z' },
    { id: 3, name: 'Summer Smith', status: 'Alive', species: 'Human', type: '', gender: 'Female', origin_name: 'Earth (Replacement Dimension)', origin_url: '', location_name: 'Earth (Replacement Dimension)', location_url: '', image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg', episode: ['https://rickandmortyapi.com/api/episode/6'], url: 'https://rickandmortyapi.com/api/character/3', created: '2017-11-04T19:09:56.428Z' },
    { id: 4, name: 'Beth Smith', status: 'Alive', species: 'Human', type: '', gender: 'Female', origin_name: 'Earth (Replacement Dimension)', origin_url: '', location_name: 'Earth (Replacement Dimension)', location_url: '', image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg', episode: ['https://rickandmortyapi.com/api/episode/6'], url: 'https://rickandmortyapi.com/api/character/4', created: '2017-11-04T19:22:43.665Z' },
    { id: 5, name: 'Jerry Smith', status: 'Alive', species: 'Human', type: '', gender: 'Male', origin_name: 'Earth (Replacement Dimension)', origin_url: '', location_name: 'Earth (Replacement Dimension)', location_url: '', image: 'https://rickandmortyapi.com/api/character/avatar/5.jpeg', episode: ['https://rickandmortyapi.com/api/episode/6', 'https://rickandmortyapi.com/api/episode/7'], url: 'https://rickandmortyapi.com/api/character/5', created: '2017-11-04T19:26:56.301Z' },
    { id: 6, name: 'Abadango Cluster Princess', status: 'Alive', species: 'Alien', type: '', gender: 'Female', origin_name: 'Abadango', origin_url: '', location_name: 'Abadango', location_url: '', image: 'https://rickandmortyapi.com/api/character/avatar/6.jpeg', episode: ['https://rickandmortyapi.com/api/episode/27'], url: 'https://rickandmortyapi.com/api/character/6', created: '2017-11-04T19:50:28.250Z' },
    { id: 7, name: 'Abradolf Lincler', status: 'unknown', species: 'Human', type: 'Genetic experiment', gender: 'Male', origin_name: 'Earth (Replacement Dimension)', origin_url: '', location_name: 'Testicle Monster Dimension', location_url: '', image: 'https://rickandmortyapi.com/api/character/avatar/7.jpeg', episode: ['https://rickandmortyapi.com/api/episode/10', 'https://rickandmortyapi.com/api/episode/11'], url: 'https://rickandmortyapi.com/api/character/7', created: '2017-11-04T19:59:25.955Z' },
    { id: 8, name: 'Adjudicator Rick', status: 'Dead', species: 'Human', type: '', gender: 'Male', origin_name: 'unknown', origin_url: '', location_name: 'Citadel of Ricks', location_url: '', image: 'https://rickandmortyapi.com/api/character/avatar/8.jpeg', episode: ['https://rickandmortyapi.com/api/episode/28'], url: 'https://rickandmortyapi.com/api/character/8', created: '2017-11-04T20:03:34.737Z' },
    { id: 9, name: 'Agency Director', status: 'Dead', species: 'Human', type: '', gender: 'Male', origin_name: 'Earth (Replacement Dimension)', origin_url: '', location_name: 'Earth (Replacement Dimension)', location_url: '', image: 'https://rickandmortyapi.com/api/character/avatar/9.jpeg', episode: ['https://rickandmortyapi.com/api/episode/24'], url: 'https://rickandmortyapi.com/api/character/9', created: '2017-11-04T20:06:54.976Z' },
    { id: 10, name: 'Alan Rails', status: 'Dead', species: 'Human', type: 'Superhuman', gender: 'Male', origin_name: 'unknown', origin_url: '', location_name: 'Interdimensional Cable', location_url: '', image: 'https://rickandmortyapi.com/api/character/avatar/10.jpeg', episode: ['https://rickandmortyapi.com/api/episode/25'], url: 'https://rickandmortyapi.com/api/character/10', created: '2017-11-04T20:19:09.017Z' },
  ];

  for (const c of characters) {
    await pool.query(
      `INSERT INTO characters (id, name, status, species, type, gender, origin_name, origin_url, location_name, location_url, image, episode, url, created)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`,
      [c.id, c.name, c.status, c.species, c.type, c.gender, c.origin_name, c.origin_url, c.location_name, c.location_url, c.image, c.episode, c.url, c.created]
    );
  }

  console.log('Personajes insertados');
}

module.exports = { pool, initDb };
