const router = require('express').Router();
const https = require('https');
module.exports = router;

var getRepo = function(repo){
	var options = {
		host: repo
	}

	console.log('got to this function btw');
	console.log(repo);
	return https.get(options, function(res){
		console.log(res.data);
	});
		
};

router.get('/', function(req, res, next){
	res.status('200').send('at /');
});

router.post('/repo', function(req, res, next){
		console.log(getRepo(req.body.repo));
		res.send('posted fine');
});