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

router.get('/:id', function(req, res, next){
	Room.findById(req.params.id)
		.then(function(room){
			res.send(room);
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

router.delete('/:id', function(req, res, next){
	Room.destroy({where: {id: req.params.id}})
		.then(function(){
			res.send(200);
		})
		.catch(next);
});
