var Sequelize = require('sequelize');
var db = require('../_db');

module.exports = db.define('channel', { // this channel database is the one we need to use
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	view: {
		type: Sequelize.INTEGER,
		defaultValue:0,
	},
	category:{
		type:Sequelize.STRING,
	},
	tags: {
		type: Sequelize.ARRAY(Sequelize.TEXT),
	},
	coverimage:{
		type:Sequelize.STRING,
	},
	channelID:{
		type:Sequelize.STRING
	},
});

