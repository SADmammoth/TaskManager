const express = require('express');
const showApp = require('../helpers/showApp').showApp;

const router = express.Router();

router.get('/', showApp);

router.get('/add', showApp);

router.get('/login', showApp);

router.get('/404-error-page', showApp);

router.get('*', (req, res) => {
  res.redirect('/404-error-page');
});

module.exports = router;
