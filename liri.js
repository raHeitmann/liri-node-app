var inquirer = require("inquirer");
var twitter = require('twitter');
var Spotify = require('node-spotify-api')
var keys = require('./keys.js');
var request = require('request');
var song = '';


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

      console.log("")
      console.log("")
      
     for (var i = 0; i<20; i++)
     {
        console.log("")
        console.log("TWEET: '"+tweets[i].text+"'");
        console.log("DATE AND TIME: '"+tweets[i].created_at);
        console.log("")
     }

     console.log("")
     console.log("")

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

//   * Title of the movie.
//   * Year the movie came out.
//   * IMDB Rating of the movie.
//   * Country where the movie was produced.
//   * Language of the movie.
//   * Plot of the movie.
//   * Actors in the movie.
//   * Rotten Tomatoes URL.


 inquirer.prompt([

        {
        type: "input",
        message: "What is the movie you would like to search?",
        name: "movieName"
    }

    ]).then(function(user) {
 
        
request('http://www.omdbapi.com/?apikey=40e9cece&t='+user.movieName+'&r=json', function (error, response, body) {
    console.log("");
    console.log("");
    console.log("");
  console.log('error:', error); // Print the error if one occurred 
  console.log('statusCode:', response && response.statusCode);
  var info = JSON.parse(body) // Print the response status code if a response was received 
  console.log('Title:', info.Title);
  console.log('Year:', info.Year);
  console.log('imdbRating:', info.imdbRating);
  console.log('Country:', info.Country);
  console.log('Language:', info.Language);
  console.log('Plot:', info.Plot);
  console.log('Actors:', info.Actors);
  console.log('Plot:', info.Website);
  console.log("");
  console.log("");
  console.log("");
});

 
});

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

    omdb();
}

else if (user.action === 'Do-What-It-Says') {

    const fs = require('fs');
   fs.readFile('./random.txt', 'utf8', (err, data) => {
  if (err) throw err;

  data = data.split(',');
  song = data[1];

  spootifu.search({ type: 'track', query: song }, function(err, data) {
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

})
