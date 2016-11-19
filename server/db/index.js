'use strict';
var db = require('./_db');
module.exports = db;

// eslint-disable-next-line no-unused-vars
var User = require('./models/user');
var Channel = require('./models/channel');
// if we had more models, we could associate them in this file
// e.g. User.hasMany(Reports)

//add the user ID of the user that started it to the room table
Channel.belongsTo(User);