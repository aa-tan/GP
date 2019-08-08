var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/',(req, res)=>{
	var cookie = req.cookies.train
	if(cookie == undefined){
		res.cookie('train', 0)
    		res.render('input_form', {title:'hey', message:'Training Mode', submitPath:"/train"})
	}
	else{
	    res.render('input_form', {title:'hey', message:'Current submissions:' + cookie, submitPath:"/train"})
	}
	
})

router.post('/train', (req, res) => {
    console.log(req.body)
    var cookie = req.cookies.train
    console.log(cookie)
    axios.post(`http://${process.env.BACK_SERVICE}:${process.env.BACK_PORT}/train`, req.body)
    .then((response)=>{
        if(response['data'] == "True"){
	    if(cookie != undefined){
		res.cookie('train', parseInt(cookie) + 1);
	    }
            res.redirect('/');
        }
        else if(response['data'] == "False"){
            res.redirect('/failure');
        }
	else if(response['data'] == "Invalid"){
	    res.redirect('/invalid')
	}
	else{
	    res.redirect('/failure')
	}
    })
    .catch((error)=>{
        console.log(error);
        res.redirect('/failure');
    })
})

module.exports = router;
