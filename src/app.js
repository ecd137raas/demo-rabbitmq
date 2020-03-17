const express = require('express');
var app = express();
const router = express.Router();

//Rotas
const index = require('./routes/index')

app.use('/', index);


module.exports = app;