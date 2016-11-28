'use strict';
var router = require('express').Router();
var Channel = require('../../../db').models.channel;
var User = require('../../../db').models.user;
var Subscription = require('../../../db').models.subscription;
module.exports = router;

router.post('/subscription/:broadcasterId/:subscriberId', function(req,res,next){
	Subscription.findOrCreate({
		where:{
			broadcasterId: req.params.broadcasterId,
			subscriberId: req.params.subscriberId,
		},
	})
		.then(function(result){
			res.send(result);
		})
		.catch(next);
})

router.get('/subscribers/:broadcasterId', function(req,res,next){
	Subscription.findAll({
		where:{
			broadcasterId: req.params.broadcasterId
		},
		include:[
			{model:User, as:'subscriber'},
			{model:User, as:'broadcaster'},
		],
	})
		.then(function(result){
			res.send(result);
		})
		.catch(next);
})

router.get('/', function(req,res,next){ //get all rooms
	Channel.findAll({
		order: 'view DESC'
	})
		.then(function(channels){
			res.send(channels);
		})
		.catch(next);
});

router.get('/category/:category', function(req, res, next){
	Channel.findAll({
		where:{
			category: req.params.category
		},
		order: 'view DESC',
	})
		.then(function(channels){
			res.send(channels);
		})
		.catch(next);
})


router.get('/channelname/:channelname', function(req, res, next){
	Channel.findAll({
		where:{
			//name: req.params.channelname
			name:{
				$like: '%' + req.params.channelname + '%'
			}
		},
		order: 'view DESC',
	})
		.then(function(channels){
			res.send(channels);
		})
		.catch(next);
})

router.get('/tag/:tag', function(req, res, next){
	var tagsArr = req.params.tag.replace(/\s+/g,'').split(',');

	Channel.findAll({
		where:{
			tags: {
				//$contains : [req.params.tag]
				$contains: tagsArr
			}
		},
		order: 'view DESC',
	})
		.then(function(channels){
			res.send(channels);
		})
		.catch(next);
})






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
		name: req.body.channelName,
		tags: req.body.tags,
		coverimage: req.body.coverImage,
		category: req.body.category,
		channelID: req.body.channelId
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


