'use strict';
var router = require('express').Router();
var User = require('../../../db').models.user;
module.exports = router;

router.post('/', function(req, res, next){
	User.create(req.body)
		.then(function(user){
			res.send(user);
		})
		.catch(next);
});
