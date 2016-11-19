'use strict';
var router = require('express').Router();
var Channel = require('../../../db').models.channel;
module.exports = router;

router.get('/', function(req,res,next){ //get all rooms
	Channel.findAll()
		.then(function(channels){
			res.send(channels);
		})
		.catch(next);
});

//can we use ID? Also can we send a req.body instead of a param if a user never actually lands here? 
router.put('/increase/:id', function(req,res,next){ //increase view count by one if someone joins a room
	Channel.update({
			view:Sequelize.literal('view + 1')
		},
		{
			where:{
				id:req.params.id
			}
		}
	)
		.then(function(channel){
			res.send(channel);
		})
		.catch(next);
});

//same comments as the put above
router.put('/reduce/:id', function(req,res,next){ //reduce view count by one if someone leaves a room
	Channel.update({
			view:Sequelize.literal('view - 1')
		},
		{
			where:{
				id:req.params.id
			}
		}
	)
		.then(function(channel){
			res.send(channel);
		})
		.catch(next);
});

//can probably just change the front end a little to send a req.body with all info instead of a URL param 
router.post('/', function(req,res,next){ //add a new channel to our database after someone opens a room
	Channel.create({
		name: req.body.name,
		tags: req.body.tags,
		coverimage: req.body.coverImage,
		category: req.body.category,
	})
		.then(function(channel){
			res.send(channel);
		})
		.catch(next);
});

router.delete('/:id', function(req,res,next){ //remove a channel from our database
	Channel.destroy({
		where:{
			name: req.params.id
		}
	})
	.then(function(){
		res.sendStatus(200);
	})
	.catch(next);
});

// i added this from what I had working. just lets us get a channel w/ a specific ID
router.get('/:id', function(req, res, next){
	Channel.findById(req.params.id)
		.then(function(channel){
			res.send(channel);
		})
		.catch(next);
});


