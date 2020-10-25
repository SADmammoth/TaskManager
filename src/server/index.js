const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const apiRouter = require('./router/apiRouter');
const cookieParser = require('cookie-parser');
const pagesRouter = require('./router/pagesRouter');
const authRouter = require('./router/authRouter');
const passportInit = require('./passport/passportInit');

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
