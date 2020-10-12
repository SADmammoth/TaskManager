import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import passport from 'passport';
import apiRouter from './router/apiRouter';
import cookieParser from 'cookie-parser';
import pagesRouter from './router/pagesRouter';
import authRouter from './router/authRouter';
import passportInit from './passport/passportInit';

const port = process.env.PORT || 8080;
const app = express();

mongoose.connect(process.env.MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.set('useCreateIndex', true);

app.use(cookieParser());
app.use(passport.initialize());

app.use(express.static(__dirname + '/dist'));
app.use(express.json());
passportInit();

app.use(cors());
app.use('/api', authRouter);
app.use('/api', passport.authenticate('jwt', { session: false }), apiRouter);
app.use(pagesRouter);

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
