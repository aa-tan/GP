var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/',(req, res)=>{
    res.render('input_form', {title:'hey', message:'Training Mode', submitPath:"/train"})
})

router.post('/train', (req, res) => {
    axios.post('http://localhost:5000/train', req.body)
    .then((response)=>{
        if(response['data'] == "True"){
            res.redirect('/');
        }
        else{
            res.redirect('/failure');
        }
    })
    .catch((error)=>{
        console.log(error);
        res.redirect('/failure');
    })
})

module.exports = router;
