var MongoClient = require('mongodb').MongoClient;
var path = require('path');
const dbpath = "mongodb://localhost:27017/gp";
var viewPath = path.join(__dirname, 'views');

var express = require('express');
const axios = require('axios');
var router = express.Router();

var url = require('url')

// Routes

// Home page
router.get('/', (req, res) => {
    res.render('index', {title:'hey', message:'this is a message'});
    //res.send('<b>test</b>')
})

// Successful login
router.get('/done', (req, res) => {
    axios.post('http://localhost:5000/post', {typingspeed:req.query['typingspeed']})
    .then(function (response) {
        if(response['data'] == 'True'){
            res.send('Yay')
        }
        else{
            res.redirect('/fail')
        }
    })
    .catch(function (error) {
        console.log(error);
        res.redirect('/fail')
    }); 
})

// Failed login
router.get('/fail', (req, res) => {
    res.send("fail");
})

// Login post
router.post('/login', (req, res)=> {
    name = req.body.username;
    password = req.body.password;
    MongoClient.connect(dbpath, { useNewUrlParser: true }, (err, db) => {
        if (err) throw err;
        var dbo = db.db("gp");
        var query = { username:name};
        dbo.collection("users").find(query).toArray( (err, result) => {
            if (err) throw err;
            if(result.length != 0){ 
                if(password == result[0]["password"]){  
                    console.log(req.body.typingspeed)
                    res.redirect(url.format({
                        pathname:"/done",
                        query: {typingspeed:req.body.typingspeed}
                    }))
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

module.exports = router;
