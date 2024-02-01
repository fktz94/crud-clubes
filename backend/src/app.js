const express = require('express');
const cors = require('cors');
const v1ClubRouter = require('./v1/routes/clubRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.text('*/*'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('uploads'));
// app.use(express.static(`${__dirname}/uploads`));

app.use('/api/v1/clubs', v1ClubRouter);

module.exports = app;
