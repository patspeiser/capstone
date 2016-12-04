'use strict';
var router = require('express').Router();
var Channel = require('../../../db').models.channel;
var User = require('../../../db').models.user;
var Subscription = require('../../../db').models.subscription;
module.exports = router;



router.get('/subscription/:viewerId/:channelId', function(req,res,next){
	Channel.findOne({
		where:{
			channelID: req.params.channelId
		}
	})
		.then(function(result){
			if(!result){
				res.send(true);
			}
			else if (result.dataValues.userId){
				if(result.dataValues.userId == req.params.viewerId){
					res.send(true);
				}
				else{
					return Subscription.findOne({
						where:{
							subscriberId: req.params.viewerId,
							broadcasterId: result.dataValues.userId,
						}
					})
					.then(function(result2){
						if (result2){
							res.send(result2.dataValues);
						}
						else{
							res.send(false);
						}
					});
				}			
			}
			else {
				res.send (true);
			}
			
		})
		.catch(next);
});

router.post('/subscription/:channelId/:subscriberId', function(req,res,next){
	Channel.findOne({
		where:{
			channelID: req.params.channelId
		}
	})
		.then(function(result){
			Subscription.findOrCreate({
				where:{
					broadcasterId: result.dataValues.userId,
					subscriberId: req.params.subscriberId,
				},
			})
				.then(function(result){
					res.send(result);
				})
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
router.put('/viewCount', function(req,res,next){ //increase view count by one if someone joins a room
	Channel.update({
			view:req.body.view
		},
		{
			where:{
				channelID:req.body.channelID
			}
		}
	)
		.then(function(channel){
			res.send(channel);
		})
		.catch(next);
});

router.post('/', function(req,res,next){ //add a new channel to our database after someone opens a room
	//sloppy fix here. just wrapped the tags in an array. gotta fix this on the front end
	Channel.create({
		name: req.body.channelName,
		tags: [req.body.tags],
		coverimage: req.body.coverImage,
		category: req.body.category,
		channelID: req.body.channelId,
		userId: req.body.userId,
	})
		.then(function(channel){
			res.send(channel);
		})
		.catch(next);
});

router.delete('/:id', function(req,res,next){ //remove a channel from our database
	Channel.destroy({
		where:{
			channelID: req.params.id
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


