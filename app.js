const express = require('express');
// const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const db = require('./config/db');

db.authenticate()
  .then(() => console.log('database connected'))
  .catch(err => console.log(err.message));

const app = express();


//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json({type:"application/json"}))

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started at port ${PORT}`));