const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/view', (req, res) => {
  res.render('view');
});

router.get('/:userId/create', (req, res) => {
  res.render('create');
});

router.post('/:userId/create', (req, res) => {
  // post user beat to mongodb
  // then res.status(201).end()
});

module.exports = router;
