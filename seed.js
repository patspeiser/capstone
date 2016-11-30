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
var Subscription = db.model('subscription');
var Promise = require('sequelize').Promise;

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password',
        },
        {
            email: 'obama@gmail.com',
            password: 'potus',
            name: 'obama',
        },
        {
            email: 'fake@gmail.com',
            password: 'fake',
        },
        {
            email: 'doodoo@gmil.com',
            password: 'doodoo',
        },
        {
            email: 'busbusad@yahoo.com',
            password:'busbusad',
            name:'dd',
        },
        {
            email: 'lifetimeinc@gmail.com',
            password:'lifetimeinc',
            name:'paul',            
        },
    ];

    var creatingUsers = users.map(function (userObj) {
        return User.create(userObj);
    });

    return Promise.all(creatingUsers);

};


var seedSubscriptions = function () {

    var subscriptions = [
        {
            broadcasterId: 2,
            subscriberId: 5,
        },
        {
            broadcasterId: 2,
            subscriberId: 6,
        },
    ];

    var creatingSubscriptions = subscriptions.map(function (subObj) {
        return Subscription.create(subObj);
    });

    return Promise.all(creatingSubscriptions);

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
            coverimage: 'https://i.imgsafe.org/f09c7d4fad.png',
        }, 
        {
            name: 'cspan_fun',
            view: 777,
            category:'Politics',
            tags: ['congress', 'ron', 'paul'],
            coverimage: 'https://i.imgsafe.org/f09c7d4fad.png',
        }, 
        {
            name: 'congress_baseball',
            view: 111,
            category:'Politics',
            tags: ['congress', 'baseball'],
            coverimage: 'https://i.imgsafe.org/f09c7d4fad.png',
        }, 
        {
            name: 'posion_dumpling',
            view: 999,
            category:'Cooking',
            tags: ['dumpling', 'poison'],
            coverimage: 'https://i.imgsafe.org/f09c7d4fad.png',
        }, 
        {
            name: 'clinton_cash',
            view: 55,
            category:'Politics',
            tags: ['ron', 'book'],
            coverimage: 'https://i.imgsafe.org/f09c7d4fad.png',
        }, 
        {
            name: 'smoothies_n_shakes',
            view: 80,
            category:'Cooking',
            tags: ['fruit'],
            coverimage: 'https://i.imgsafe.org/f09c7d4fad.png',
        }, 
        {
            name: 'guitar_lessons_with_gary',
            view: 8,
            category:'Music',
            tags: ['music', 'guitar'],
            coverimage: 'https://i.imgsafe.org/f09c7d4fad.png',
        }
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
    .then(function(){
        return seedSubscriptions();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
