const express = require('express');
// TODO: add validation
// const { body } = require('express-validator');

const cheapsharkController = require('../controllers/cheapshark');

const router = express.Router();

router.post('/deals', cheapsharkController.postDeals);

module.exports = router;
