require("dotenv").config();
const request = require('request');
const keys = require('keys.js');
const command = process.argv[3];
const specifiedMedia = process.argv[4];
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
console.log(spotify);


/*
// LOOK UP VS DEBUG AND WORK ON GETTING USED TO DEBUGGING!
//show last 20 tweets and when they were created (twitter API)
function tweets(a) {

}

//show song info: artist(s), song name, spotify preview link, album song is from
// if no song provided, default to Ace of Bass' 'The Sign' (Spotify API)
function song() {

}

//show movie info: movie title, year, IMDB rating, Rotten Tomatoes rating, Country of movie, Movie language, Plot Summary, Actors in movie
//if no input, defaults to 'Mr. Nobody' (OMDB API)
function movie() {

}

// using fs Node package, takes text inside random.txt and then use it to call one of LIRI's commands (should run spotify-this-song for "I Want It That Way" as follows the text in random.txt, can also make changes to text to test feature for other commands)
function readAndDo () {

}
*/
