// linking required packages
require("dotenv").config();
const request = require('request');
const twitter = require('twitter');
const Spotify = require('node-spotify-api');
const keys = require('keys.js');
//putting user input into variables
const command = process.argv[2];
const media = process.argv.splice(3);
//Calling in API keys
// var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
console.log(client);
console.log(command);
console.log(media);
//switch takes the user's command and applies the relavent function and package for each
/*
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
*/
/*
// LOOK UP VS DEBUG AND WORK ON GETTING USED TO DEBUGGING!
//show last 20 tweets and when they were created (twitter package)
function tweets(a) {

}

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
