'use strict';
var router = require('express').Router();
var Room = require('../../../db').models.room;
console.log(Room);
module.exports = router;

router.get('/', function(req, res, next){
	Room.findAll()
		.then(function(rooms){
			res.send(rooms);
		})
		.catch(next);
});

router.post('/', function(req, res, next){
	Room.create(req.body)
		.then(function(room){
			res.send(room);
		})
		.catch(next);
});