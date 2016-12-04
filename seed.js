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
            email: 'doodoo@gmail.com',
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
        {
            email: 'nicedog@gmail.com',
            password:'nicedog',
            name:'nice dog',
        },
        {
            email: 'nicecat@gmail.com',
            password:'nicecat',
            name:'nice cat',
        },
        {
            email: 'broadcasterkhan@gmail.com',
            password:'capstone',
            name:'Donald',            
        },
        {
            email: 'viewerkhan@gmail.com',
            password:'capstone',
            name:'Mickey',            
        },
        {
            email: 'viewerkhan3@yahoo.com',
            password:'capstone',
            name:'Goofy',            
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
            broadcasterId: 9,
            subscriberId: 10,
        },
        {
            broadcasterId: 9,
            subscriberId: 11,
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
            name: 'Riot',
            view: 2,
            category:'Politics',
            tags: ['riot', 'police'],
            coverimage: 'https://img.rt.com/files/oldfiles/usa/riots-us-minorities-london/riot-august-mob-set.jpg',
            userId: 1,
        }, 
        {
            name: 'Election',
            view: 5,
            category:'Politics',
            tags: ['trump', 'hillary'],
            coverimage: 'https://www.thetrace.org/wp-content/uploads/2016/11/AP_833303388986-1-400x300-c-top.jpg',
            userId:2,
        }, 
        {
            name: 'cupcakes',
            view: 8,
            category:'Cooking',
            tags: ['cupcakes', 'baking'],
            coverimage: 'http://3.bp.blogspot.com/_R0Rc6mb8H6E/TJnHT02gIfI/AAAAAAAAHYI/GseuCQIPbsM/s400/design-fetish-japanese-inspired-cupcakes.jpg',
            userId:3,
        }, 
        {
            name: 'Dance',
            view: 777,
            category:'Entertainment',
            tags: ['dance', 'show', 'night'],
            coverimage: 'http://admin.whatsongroup.net/Admin/uploads/displays/E/entertain-june12.jpg',
            userId:4,
        }, 
        {
            name: 'piano show',
            view: 111,
            category:'Music',
            tags: ['piano', 'solo'],
            coverimage: 'http://grayschoolofmusic.com/wp-content/uploads/2016/06/Bio-pic-2016-400x300.jpg',
            userId:5,
        }, 
        {
            name: 'party',
            view: 999,
            category:'Event',
            tags: ['birthday', 'party'],
            coverimage: 'https://www.luxeeventrental.com/wp-content/uploads/2015/08/event-image.png',
            userId:6,
        }, 
        {
            name: 'soccer',
            view: 55,
            category:'Sports',
            tags: ['soccer', 'indoor'],
            coverimage: 'https://mylsports.com/CAA/Sites/Default/file/2016/01/11/goals_turf_field1_1.jpg',
            userId:7,
        }, 
        {
            name: 'Hi',
            view: 80,
            category:'Vlog',
            tags: ['hi'],
            coverimage: 'http://timesofindia.indiatimes.com/thumb/msid-48391017,width-400,resizemode-4/48391017.jpg',
            userId:8,
        }, 
        {
            name: 'make pizza',
            view: 8,
            category:'Cooking',
            tags: ['baking', 'pizza'],
            coverimage: 'http://static4.businessinsider.com/image/4e80d2b06bb3f7355c000012-1190-625/taste-test-herman-cain-turned-godfathers-into-cheap-and-crappy-pizza.jpg',
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
