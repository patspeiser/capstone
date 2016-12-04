'use strict';
var router = require('express').Router();
var User = require('../../../db').models.user;
module.exports = router;

router.post('/:id', function(req, res, next){
	User.findById(req.params.id)
		.then(function(user){
			user.dropbox_id = req.body.user.dropbox_id;
			user.save()
				.then(function(){
					res.send(user);
				});
		})
		.catch(next);
});

router.post('/', function(req, res, next){
	User.create(req.body)
		.then(function(user){
			res.send(user);
		})
		.catch(next);
});
