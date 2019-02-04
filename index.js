const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const router =require('./router')
const mongoose = require('mongoose');

//DB SET UP

mongoose.connect('mongodb://localhost/auth');

//APP SETUP
//app.use(morgan('combined'))
app.use(bodyParser.json({type:'*/*'}))
router(app);
//server set up
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port)
console.log('server is running at',port)

