var express = require('express');
var router = express.router();

router.get('/', (req, res) => {
    res.render('input_form');
})
