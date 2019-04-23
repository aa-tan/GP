// Express variable declarations
const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const port = 3000;

var path = require('path');
var viewPath = path.join(__dirname, 'views');

// Setting up Express
app.set('views', viewPath);
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('src/public'))
//app.use(express.cookieSession());

app.use(require('./controllers/routes'))


app.listen(port, () => console.log(`App is listening on localhost://${port}!`))
