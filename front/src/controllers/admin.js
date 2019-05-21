var express = require('express');
var router = express.Router();

var axios = require('axios');

// Routes

// Add user page
router.get('/', (req, res) => {
    res.render('add_user')
})

// Handles adding user
router.post('/add_user', (req, res) => {
    axios.post(`http://${process.env.BACK_SERVICE}:${process.env.BACK_PORT}/new_user`, req.body)
    .then((response) => {
        if(response['data'] != "False"){
            name = response['data']['username']
            pword = response['data']['password']
            res.render('new_user', { username: name, password: pword });
        }
        else{
            res.redirect('failure');
        }
    })
    .catch((error) => {
        console.log(error);
        res.redirect('/')
    })
})

module.exports = router;
