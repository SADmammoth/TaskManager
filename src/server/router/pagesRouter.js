import express from 'express';
import { showApp } from '../helpers/showApp';

const router = express.Router();

router.get('/', showApp);

router.get('/add', showApp);

router.get('/login', showApp);

router.get('/404-error-page', showApp);

router.get('*', (req, res) => {
  res.redirect('/404-error-page');
});

export default router;
