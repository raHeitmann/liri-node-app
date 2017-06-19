var inquirer = require("inquirer");
var twitter = require('twitter');
var Spotify = require('node-spotify-api')
var keys = require('./keys.js');

    var client = new twitter({
  consumer_key: 'WTzvwwmo1Ej0xS8ksPR1V3ubS',
  consumer_secret: 'YvLZG7i3uqe2cqnr6kP2dM4B3ksCuT2tgwf0IcjpKSASQi4iMB',
  access_token_key: '876488804118523904-PUUM90v5usD4J1ohy77i9YfATkYgtyg',
  access_token_secret: 'xXVGQaZJiYbKkVBKLcTVQnV7LC3oG6wjnSzIebGaLuFPD'
});

var spootifu = new Spotify({
  id: 'cea014b3c5b74fd984e8a94e5c3b3e2c',
  secret: '6d8cbf6d7c3147c7944d37d6992fd1b2'
});


//TWITTER 

function tweeting(){

var params = {screen_name: 'john_johntesty'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
      
     for (var i = 0; i<20; i++)
     {
        console.log("")
        console.log("TWEET: '"+tweets[i].text+"'");
        console.log("DATE AND TIME: '"+tweets[i].created_at);
        console.log("")
     }
  }
});
       
}


//SPOTIFY 

function spotify(){


    inquirer.prompt([

        {
        type: "input",
        message: "What is the song you would like to search?",
        name: "songName"
    }

    ]).then(function(user) {


        spootifu.search({ type: 'track', query: user.songName }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        
        console.log("");
        console.log("");
        console.log("Artist(s): "+data.tracks.items[0].album.artists[0].name);
        console.log("Album: "+data.tracks.items[0].album.name); 
        console.log("Track: "+data.tracks.items[0].name); 
        console.log("Preview Link (cmd+double click to listen in browser!): ");
        console.log(data.tracks.items[0].preview_url); 
        console.log("");
        console.log("");
        
     

        });

        });

}

function omdb(){

    //TODOfire when processargv2 = movie-this

}

function dowhat(){
    
    //TODOfire when processargv2 = do-what-it-says

}

//INITIAL QUESTION PROMPT

inquirer.prompt([
    {
    type: "list",
    message: "What would you like me to do?",
    choices: ["Tweets", "Spotify", "Movie", "Do-What-It-Says"],
    name: "action"
  },

]).then(function(user) {

console.log("You picked "+user.action)

 if (user.action === 'Tweets') {

    tweeting();

}

else if (user.action === 'Spotify') {

    spotify();
 
}

else if (user.action === 'Movie') {

//TODO twitter();

    console.log("==============================================");
    console.log("");
    console.log("Welcome " + user.name);
    console.log("Your favorite color is blue");
    console.log("You are interested in just about everything!");
    
    console.log("==============================================");

 
}

else if (user.action === 'Do-What-It-Says') {

//TODO twitter();

    console.log("==============================================");
    console.log("");
    console.log("Welcome " + user.name);
    console.log("Your favorite color is blue");
    console.log("You are interested in just about everything!");
    
    console.log("==============================================");

 
}

})

//   else {
// inquirer.prompt([
//     {
//     type: "list",
//     message: "What is your favorite color?",
//     choices: ["Green", "Blue", "Red", "Purple", "Yellow", "Orange", "Black"],
//     name: "color"
//   },

//     {
//     type: "checkbox",
//     message: "What interests you?",
//     choices: ["The Outdoors", "People", "Space", "Nothing"],
//     name: "interest"
//   },


//   {
//     type: "confirm",
//     message: "Are you sure:",
//     name: "confirm",
//     default: true

//   }
// ]).then(function(user) {

// console.log(JSON.stringify(user, null, 2));
//  if (user.confirm) {

    // console.log("==============================================");
    // console.log("");
    // console.log("Welcome " + currentUser);
    // console.log("Your favorite color is " + user.color);
    // console.log("You are interested in "+user.interest);
    
    // console.log("==============================================");

  // If the user does not confirm, then a message is provided and the program quits.



