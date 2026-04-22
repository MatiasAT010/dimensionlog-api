const characterService = require('../services/character.service');

function getAll(req, res) {
  const result = characterService.getAll(req.query);

  if (!result) {
    return res.status(404).json({ error: 'There is nothing here' });
  }

  return res.status(200).json(result);
}

async function getById(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  const character = await characterService.getById(id);

  if (!character) {
    return res.status(404).json({ error: 'Character not found' });
  }

  return res.status(200).json(character);
}

module.exports = { getAll, getById };
