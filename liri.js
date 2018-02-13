// linking required packages
require("dotenv").config();
const keys = require('./keys.js');
const request = require('request');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
//putting user input into variables
const command = process.argv[2];
let media = process.argv.splice(3).join(" ");
//Calling in API keys
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
//console.log(command);
//console.log(media);
//switch takes the user's command and applies the relavent function and package for each
switch(command) {
    case "my-tweets":
    tweets();
    break;

    case "spotify-this-song":
    song(media);
    break;

    case "movie-this":
    movie();
    break;

    case "do-what-it-says":
    readAndDo();
    break;
}


// LOOK UP VS DEBUG AND WORK ON GETTING USED TO DEBUGGING!
//show last 20 tweets and when they were created (twitter package)
function tweets() {
    
    var params = { screen_name: 'irl_andy_irl' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (i = 0; i < 20; i++) {
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);
            }
        }
    });
}

//show song info: artist(s), song name, spotify preview link, album song is from
// if no song provided, default to Ace of Bass' 'The Sign' (Spotify package)
function song(media) {
    if (media === "") {
        media = "The Sign"
    }
    spotify.search({ type: 'track', query: media }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else if (media === "The Sign") {
            console.log(data.tracks.items[5].artists[0].name);
            console.log(data.tracks.items[5].name);
            console.log(data.tracks.items[5].external_urls.spotify);
            return console.log(data.tracks.items[5].album.name);
        } 
    console.log(data.tracks.items[0].artists[0].name);
    console.log(data.tracks.items[0].name);
    console.log(data.tracks.items[0].external_urls.spotify);
    console.log(data.tracks.items[0].album.name);
    });
}
/*
//show movie info: movie title, year, IMDB rating, Rotten Tomatoes rating, Country of movie, Movie language, Plot Summary, Actors in movie
//if no input, defaults to 'Mr. Nobody' (OMDB package)
function movie() {

}

// using fs Node package, takes text inside random.txt and then use it to call one of LIRI's commands (should run spotify-this-song for "I Want It That Way" as follows the text in random.txt, can also make changes to text to test feature for other commands)
function readAndDo () {

}
*/
