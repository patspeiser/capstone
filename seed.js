/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var chalk = require('chalk');
var db = require('./server/db');
var User = db.model('user');
var Channel = db.model('channel');
var Promise = require('sequelize').Promise;

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        },
        {
            email: 'fake@gmail.com',
            password: 'fake',
        },
        {
            email: 'doodoo@gmil.com',
            password: 'doodoo',
        },
    ];

    var creatingUsers = users.map(function (userObj) {
        return User.create(userObj);
    });

    return Promise.all(creatingUsers);

};


var seedChannel = function(){
    var channels = [
        {
            name: 'cool',
            view: 2,
            category:'Politics',
            tags: ['ron', 'paul'],
            coverimage: 'http://ronpaulinstitute.org/images/SiteTemplate/LargeRonPaul.jpg',
        }, 
        {
            name: 'notmypresident',
            view: 5,
            category:'Politics',
            tags: ['trump', 'hillary'],
            coverimage: 'http://ronpaulinstitute.org/images/SiteTemplate/LargeRonPaul.jpg',
        }, 
        {
            name: 'cupcakes',
            view: 8,
            category:'Cooking',
            tags: ['cupcakes', 'baking'],
            coverimage: 'http://ronpaulinstitute.org/images/SiteTemplate/LargeRonPaul.jpg',
        }, 
    ];

    var creatingChannels = channels.map(function(channelObj){
        return Channel.create(channelObj);
    });

    return Promise.all(creatingChannels);

}


db.sync({ force: true })
    .then(function () {
        return seedUsers();
    })
    .then(function(){
       return seedChannel();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
