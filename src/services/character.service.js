const { pool } = require('../db/database');
const { PAGE_SIZE } = require('../config/config');

const characters = [
  { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human', type: '', gender: 'Male', origin: { name: 'Earth (C-137)', url: '' }, location: { name: 'Citadel of Ricks', url: '' }, image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg', episode: ['https://rickandmortyapi.com/api/episode/1', 'https://rickandmortyapi.com/api/episode/2'], url: 'https://rickandmortyapi.com/api/character/1', created: '2017-11-04T18:48:46.250Z' },
  { id: 2, name: 'Morty Smith', status: 'Alive', species: 'Human', type: '', gender: 'Male', origin: { name: 'unknown', url: '' }, location: { name: 'Citadel of Ricks', url: '' }, image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg', episode: ['https://rickandmortyapi.com/api/episode/1', 'https://rickandmortyapi.com/api/episode/2'], url: 'https://rickandmortyapi.com/api/character/2', created: '2017-11-04T18:50:21.651Z' },
  { id: 3, name: 'Summer Smith', status: 'Alive', species: 'Human', type: '', gender: 'Female', origin: { name: 'Earth (Replacement Dimension)', url: '' }, location: { name: 'Earth (Replacement Dimension)', url: '' }, image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg', episode: ['https://rickandmortyapi.com/api/episode/6'], url: 'https://rickandmortyapi.com/api/character/3', created: '2017-11-04T19:09:56.428Z' },
  { id: 4, name: 'Beth Smith', status: 'Alive', species: 'Human', type: '', gender: 'Female', origin: { name: 'Earth (Replacement Dimension)', url: '' }, location: { name: 'Earth (Replacement Dimension)', url: '' }, image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg', episode: ['https://rickandmortyapi.com/api/episode/6'], url: 'https://rickandmortyapi.com/api/character/4', created: '2017-11-04T19:22:43.665Z' },
  { id: 5, name: 'Jerry Smith', status: 'Alive', species: 'Human', type: '', gender: 'Male', origin: { name: 'Earth (Replacement Dimension)', url: '' }, location: { name: 'Earth (Replacement Dimension)', url: '' }, image: 'https://rickandmortyapi.com/api/character/avatar/5.jpeg', episode: ['https://rickandmortyapi.com/api/episode/6', 'https://rickandmortyapi.com/api/episode/7'], url: 'https://rickandmortyapi.com/api/character/5', created: '2017-11-04T19:26:56.301Z' },
  { id: 6, name: 'Abadango Cluster Princess', status: 'Alive', species: 'Alien', type: '', gender: 'Female', origin: { name: 'Abadango', url: '' }, location: { name: 'Abadango', url: '' }, image: 'https://rickandmortyapi.com/api/character/avatar/6.jpeg', episode: ['https://rickandmortyapi.com/api/episode/27'], url: 'https://rickandmortyapi.com/api/character/6', created: '2017-11-04T19:50:28.250Z' },
  { id: 7, name: 'Abradolf Lincler', status: 'unknown', species: 'Human', type: 'Genetic experiment', gender: 'Male', origin: { name: 'Earth (Replacement Dimension)', url: '' }, location: { name: 'Testicle Monster Dimension', url: '' }, image: 'https://rickandmortyapi.com/api/character/avatar/7.jpeg', episode: ['https://rickandmortyapi.com/api/episode/10', 'https://rickandmortyapi.com/api/episode/11'], url: 'https://rickandmortyapi.com/api/character/7', created: '2017-11-04T19:59:25.955Z' },
  { id: 8, name: 'Adjudicator Rick', status: 'Dead', species: 'Human', type: '', gender: 'Male', origin: { name: 'unknown', url: '' }, location: { name: 'Citadel of Ricks', url: '' }, image: 'https://rickandmortyapi.com/api/character/avatar/8.jpeg', episode: ['https://rickandmortyapi.com/api/episode/28'], url: 'https://rickandmortyapi.com/api/character/8', created: '2017-11-04T20:03:34.737Z' },
  { id: 9, name: 'Agency Director', status: 'Dead', species: 'Human', type: '', gender: 'Male', origin: { name: 'Earth (Replacement Dimension)', url: '' }, location: { name: 'Earth (Replacement Dimension)', url: '' }, image: 'https://rickandmortyapi.com/api/character/avatar/9.jpeg', episode: ['https://rickandmortyapi.com/api/episode/24'], url: 'https://rickandmortyapi.com/api/character/9', created: '2017-11-04T20:06:54.976Z' },
  { id: 10, name: 'Alan Rails', status: 'Dead', species: 'Human', type: 'Superhuman', gender: 'Male', origin: { name: 'unknown', url: '' }, location: { name: 'Interdimensional Cable', url: '' }, image: 'https://rickandmortyapi.com/api/character/avatar/10.jpeg', episode: ['https://rickandmortyapi.com/api/episode/25'], url: 'https://rickandmortyapi.com/api/character/10', created: '2017-11-04T20:19:09.017Z' },
];

function getAll(filters) {
  let result = [...characters];

  if (filters.name) {
    result = result.filter(c => c.name.toLowerCase().includes(filters.name.toLowerCase()));
  }
  if (filters.status) {
    result = result.filter(c => c.status.toLowerCase() === filters.status.toLowerCase());
  }
  if (filters.species) {
    result = result.filter(c => c.species.toLowerCase() === filters.species.toLowerCase());
  }
  if (filters.gender) {
    result = result.filter(c => c.gender.toLowerCase() === filters.gender.toLowerCase());
  }

  const page = parseInt(filters.page) || 1;
  const totalPages = Math.ceil(result.length / PAGE_SIZE) || 1;

  if (page > totalPages) return null;

  const start = (page - 1) * PAGE_SIZE;
  const results = result.slice(start, start + PAGE_SIZE);

  return {
    info: {
      count: result.length,
      pages: totalPages,
      next: page < totalPages ? `http://localhost:3000/api/character?page=${page + 1}` : null,
      prev: page > 1 ? `http://localhost:3000/api/character?page=${page - 1}` : null,
    },
    results,
  };
}

async function getById(id) {
  const { rows } = await pool.query('SELECT * FROM characters WHERE id = $1', [id]);

  if (rows.length === 0) return null;

  const c = rows[0];
  return {
    id: c.id,
    name: c.name,
    status: c.status,
    species: c.species,
    type: c.type,
    gender: c.gender,
    origin: { name: c.origin_name, url: c.origin_url },
    location: { name: c.location_name, url: c.location_url },
    image: c.image,
    episode: c.episode,
    url: c.url,
    created: c.created,
  };
}

module.exports = { getAll, getById };
