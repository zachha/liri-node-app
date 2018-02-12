// linking required packages
require("dotenv").config();
const keys = require('./keys.js');
const request = require('request');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
//putting user input into variables
const command = process.argv[2];
const media = process.argv.splice(3);
//Calling in API keys
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
console.log(command);
console.log(media);
//switch takes the user's command and applies the relavent function and package for each
switch(command) {
    case "my-tweets":
    tweets();
    break;

    case "spotify-this-song":
    song();
    break;

    case "movie-this":
    movie();
    break;

    case "do-what-it-says":
    readAndDo();
    break;
}


// LOOK UP VS DEBUG AND WORK ON GETTING USED TO DEBUGGING!
// count 20, 
//show last 20 tweets and when they were created (twitter package)
function tweets() {
    /*
    var params = { screen_name: 'irl_andy_irl' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
    });
    */
    client.get('search/tweets', { q: 'irl_andy_irl', count: 20 }, function (error, tweets, response) {
        console.log(tweets.statuses);
    });
}
/*
//show song info: artist(s), song name, spotify preview link, album song is from
// if no song provided, default to Ace of Bass' 'The Sign' (Spotify package)
function song(media) {
    spotify.search({ type: 'track', query: media }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

    console.log(data);
    });
}

//show movie info: movie title, year, IMDB rating, Rotten Tomatoes rating, Country of movie, Movie language, Plot Summary, Actors in movie
//if no input, defaults to 'Mr. Nobody' (OMDB package)
function movie() {

}

// using fs Node package, takes text inside random.txt and then use it to call one of LIRI's commands (should run spotify-this-song for "I Want It That Way" as follows the text in random.txt, can also make changes to text to test feature for other commands)
function readAndDo () {

}
*/
