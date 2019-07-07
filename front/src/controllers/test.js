var express = require('express');
const axios = require('axios');
var router = express.Router();

// Routes

// Home page
router.get('/', (req, res) => {
    var success = req.cookies.success
    var failure = req.cookies.failure
    if(success == undefined || failure == undefined){
	res.cookie("success", 0)
	res.cookie("failure", 0)	
    	res.render('input_form', {title:'hey', message:'Testing Mode', submitPath:"/login"});
    }
    else{
	res.render('input_form', {title:'hey', message:'Success: '+success+" Failure: "+failure, submitPath:"/login"})
    }
})


// Login post
router.post('/login', (req, res)=> {
    name = req.body.username;
    password = req.body.password;
    var success = req.cookies.success
    var failure = req.cookies.failure
    console.log(req.body)
    axios.post(`http://${process.env.BACK_SERVICE}:${process.env.BACK_PORT}/authenticate`, req.body)
    .then((response) => {
        if(response['data'] == 'True'){
	    if(success != undefined && failure != undefined){
		res.cookie("success", parseInt(success) + 1)
	    }
            res.redirect('/success')
        }
        else if(response['data'] == 'False'){
	    if(success != undefined && failure != undefined){
		console.log("adding fail cookie")
		res.cookie("failure", parseInt(failure) + 1)
	    }
            res.redirect('/failure')
        }
        else if(response['data'] == 'Invalid'){
            res.redirect('/invalid')
        }
    })
    .catch((error) => {
        console.log(error);
        res.redirect('/failure')
    });
})

module.exports = router;
