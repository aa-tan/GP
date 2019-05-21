// Express variable declarations
var env_path = '../config/'
if(process.env.ENV == 'PROD'){
    env_path += 'prod.env'
}
else{
    env_path += 'dev.env'
    process.env.ENV = 'DEV'
}
require('dotenv').config({path: env_path})
const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const port = process.env.FRONT_PORT;

var path = require('path');
var viewPath = path.join(__dirname, 'views');
var publicPath = path.join(__dirname, 'public/')

// Setting up Express
app.set('views', viewPath);
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(publicPath));
//app.use(express.cookieSession());


if(process.env.MODE == "ADMIN"){
    app.use(require('./controllers/admin'));
}
else if(process.env.MODE=="TRAIN"){
    app.use(require('./controllers/train'));
}
else if(process.env.MODE=="TEST"){
    app.use(require('./controllers/test'));
}
else if(process.env.MODE=="MAIN"){
    app.use(require('./controllers/main'));
}

app.use(require('./controllers/results'));


app.listen(port, () => console.log(`App is listening on ${process.env.FRONT_SERVICE}://${port}! ENV=${process.env.ENV}`))
