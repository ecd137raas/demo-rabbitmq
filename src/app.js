const express = require('express');
const router = express.Router();
var app = express();
//Rotas
const index = require('./routes')

app.use('/', index);


module.exports = app;