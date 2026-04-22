const express = require('express');
const router = express.Router();
const characterController = require('../controllers/character.controller');

router.get('/character', characterController.getAll);
router.get('/character/:id', characterController.getById);

module.exports = router;
