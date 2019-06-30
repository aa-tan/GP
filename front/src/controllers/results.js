var express = require('express');
var router = express.Router();
// Failed login
router.get('/failure', (req, res) => {
    res.render('result', {result:"failure"})
})

// Successful login
router.get('/success', (req, res) => {
    res.render('result', {result:"success"})
})

router.get('/invalid', (req, res) => {
    res.render('result', {result:"Invalid Password"})
})

module.exports = router
