// Express variable declarations
const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const port = 3000;

// MongoDB variable declarations
var MongoClient = require('mongodb').MongoClient;
var path = require('path');
const url = "mongodb://localhost:27017/gp"
var viewPath = path.join(__dirname, 'views');

// Setting up Express
app.set('views', viewPath);
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.cookieSession());



// Routes

// Home page
app.get('/', (req, res) => {
    res.render('index', {title:'hey', message:'this is a message'});
    //res.send('<b>test</b>')
})

// Successful login
app.get('/done', (req, res) => {
    res.send("done");
})

// Failed login
app.get('/fail', (req, res) => {
    res.send("fail");
})

// Login post
app.post('/login', (req, res)=> {
    name = req.body.username;
    password = req.body.password;
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
        if (err) throw err;
        var dbo = db.db("gp");
        var query = { username:name};
        dbo.collection("users").find(query).toArray( (err, result) => {
            if (err) throw err;
            if(result.length != 0){ 
                if(password == result[0]["password"]){
                    res.redirect('/done')
                }
                else {
                    res.render('index', {title: 'hey', message:'Error logging in'})
                }
            } 
            else {
                res.render('index', {title: 'hey', message:'Error logging in'})
            }
            db.close();
        });
    });
})

app.listen(port, () => console.log(`App is listening on localhost://${port}!`))
