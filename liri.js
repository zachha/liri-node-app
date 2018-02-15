// linking required packages
require("dotenv").config();
const keys = require('./keys.js');
const request = require('request');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const fs = require('fs');
//putting user input into variables
const command = process.argv[2];
var media = process.argv.splice(3).join(" ");
//Calling in API keys
const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);

// Object Literal holding all of the functions to be called in by the user's command input
function doAction(command) {
    var actions = {
        'my-tweets': function() {
           tweets();
           textLog();
        },
        'spotify-this-song': function() {
            song(media);
            textLog();
        },
        'movie-this': function() {
            movie(media);
            textLog();
        },
        'do-what-it-says': function() {
            readAndDo();
        },
        'default': function() {
            return console.log("\nPlease input a valid command");
        }
    };
    return (actions[command] || actions['default'])();
};

// LOOK UP VS DEBUG AND WORK ON GETTING USED TO DEBUGGING!

//show last 20 tweets and when they were created (twitter package)
function tweets() {
    
    var params = { screen_name: 'irl_andy_irl' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (i = 0; i < 20; i++) {
                console.log("\n", tweets[i].created_at);
                console.log("\n", tweets[i].text);
            }
        }
    });
};

//show song info: artist(s), song name, spotify preview link, album song is from
// if no song provided, default to Ace of Base's 'The Sign' (Spotify package)
function song(media) {
    if (media === "") {
        media = "The Sign"
    }
    console.log("\nYou searched for the song: " + media);
    spotify.search({ type: 'track', query: media }, function(err, data) {
        if (err) {
            return console.log("\nError occurred: " + err);
        } else if (media === "The Sign") {
            console.log("\nArtist Name: " + data.tracks.items[5].artists[0].name);
            console.log("\nSong Name: " + data.tracks.items[5].name);
            console.log("\nSpotify Link: " + data.tracks.items[5].external_urls.spotify);
            return console.log("\nAlbum Name: " + data.tracks.items[5].album.name);
        } 
        console.log("\nArtist Name: " + data.tracks.items[0].artists[0].name);
        console.log("\nSong Name: " + data.tracks.items[0].name);
        console.log("\nSpotify Link: " + data.tracks.items[0].external_urls.spotify);
        console.log("\nAlbum Name: " + data.tracks.items[0].album.name);
    });
};

//show movie info: movie title, year, IMDB rating, Rotten Tomatoes rating, Country of movie, Movie language, Plot Summary, Actors in movie
//if no input, defaults to 'Mr. Nobody' (OMDB package)
function movie(media) {
    if(media === "") {
        media = "Mr. Nobody";
    }
    const queryUrl = 'http://www.omdbapi.com/?t=' + media + '&y=&plot=short&apikey=trilogy';
    console.log("\nYou searched for the movie: " + media);
    request(queryUrl, function (error, response, body) {
        // If the request is successful
        if (!error && response.statusCode === 200) {
            console.log("\n", 'Title: ' + JSON.parse(body).Title);
            console.log("\n", 'Release Year: ' + JSON.parse(body).Year);
            console.log("\n", 'IMDB Rating: ' + JSON.parse(body).imdbRating);
            console.log("\n", 'Rotten Tomatoes Rating: ' + JSON.parse(body).Ratings[1].Value);
            console.log("\n", 'Country of Origin: ' + JSON.parse(body).Country);
            console.log("\n", 'Language: ' + JSON.parse(body).Language);
            console.log("\n", 'Plot: ' + JSON.parse(body).Plot);
            console.log("\n", 'Actors: ' + JSON.parse(body).Actors);
        }
    });

}

// using fs Node package, takes text inside random.txt and then use it to call one of LIRI's commands
function readAndDo() {
    fs.readFile("random.txt", "utf-8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        let parts = data.split(",", 2);
        let newCommand = parts[0].trim();
        media = JSON.parse(parts[1].trim());
        doAction(newCommand)
    })
}
// Keeps a log of the commands the user inputs the liri program to run in log.txt
function textLog() {
    fs.appendFile("log.txt", "\nUser ran the command: " + command + " " + media, function(err) {
        if(err) {
            return console.log(err);
        }
    })
};
// calls the object literal to run the user's specified command
doAction(command);

