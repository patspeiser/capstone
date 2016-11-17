'use strict';
var router = require('express').Router();
var User = require('../../../db').models.user;
module.exports = router;

// don't need these for now
// router.get('/', function(req, res, next){
// 	User.findAll()
// 		.then(function(users){
// 			res.send(users);
// 		})
// 		.catch(next);
// });

// router.get('/:id', function(req, res, next){
// 	User.findById(req.params.id)
// 		.then(function(user){
// 			res.send(user);
// 		})
// 		.catch(next);
// });

router.post('/', function(req, res, next){
	User.create(req.body)
		.then(function(user){
			res.send(user);
		})
		.catch(next);
});
