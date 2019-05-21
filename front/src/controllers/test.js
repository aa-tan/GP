var express = require('express');
const axios = require('axios');
var router = express.Router();

// Routes

// Home page
router.get('/', (req, res) => {
    res.render('input_form', {title:'hey', message:'Testing Mode', submitPath:"/login"});
})


// Login post
router.post('/login', (req, res)=> {
    name = req.body.username;
    password = req.body.password;
    console.log(req.body)
    axios.post(`http://${process.env.BACK_SERVICE}:${process.env.BACK_PORT}/authenticate`, req.body)
    .then((response) => {
        if(response['data'] == 'True'){
            res.redirect('/success')
        }
        else if(response['data'] == 'False'){
            res.redirect('/failure')
        }
    })
    .catch((error) => {
        console.log(error);
        res.redirect('/failure')
    });
})

module.exports = router;
