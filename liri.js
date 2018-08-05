require("dotenv").config();

var Twitter = require('twitter');
var keys = require("./keys.js")
var request = require("request");
var Spotify = require('node-spotify-api');


var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// Switch Statements
switch (process.argv[2]) {
    // Twitter
    case 'my-tweets':
        var params = { screen_name: process.argv[3] };
        client.get('statuses/user_timeline', params, function (error, tweets, response) {
            if (!error) {
                for (var i in tweets) {
                    console.log(tweets[i].text);
                }
            }
        });
        break;
    // Spotify
    case 'spotify-this-song':
        var query = "";
        if (process.argv[3] === undefined) {
            query = "The Sign"
        } else {
            query = process.argv[3]
        }
        spotify.search({ type: 'track', query: query, limit: 1 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log("Artist's Name: " + data.tracks.items[0].album.artists[0].name);
            console.log("Album Name: " + data.tracks.items[0].album.name);
            console.log("Song Name: " + data.tracks.items[0].name);
            console.log("Song Url: " + data.tracks.items[0].external_urls.spotify);
        });
        break;
    // OMDB
    case `movie-this`:
        if (process.argv[3] === undefined) {
            var queryUrl = "http://www.omdbapi.com/?t=Mr-Nobody&y=&plot=short&apikey=trilogy";

        } else {
            var movieName = process.argv[3];
            var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        }
        request(queryUrl, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log("Title: " + JSON.parse(body).Title);
                console.log("Released: " + JSON.parse(body).Released);
                console.log("Rating: " + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
            }
        });
        break;
    //Random
    case `do-what-it-says`:
        console.log(client);
        break;




}