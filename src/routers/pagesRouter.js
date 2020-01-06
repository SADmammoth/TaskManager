const express = require('express');
const path = require('path');
const router = express.Router();

let showApp = (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
};

router.all('/', showApp);

router.all('/add', showApp);

router.all('/404-error-page', showApp);

router.all('*', (req, res) => {
    res.redirect('/404-error-page');
  });

module.exports = router;