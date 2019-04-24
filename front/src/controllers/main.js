var express = require('express');
var router = express.Router();
// Failed login
router.get('/failure', (req, res) => {
    res.send("fail");
})

// Successful login
router.get('/success', (req, res) => {
    res.send("success")
})

module.exports = router
