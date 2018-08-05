require("dotenv").config();

var Twitter = require('twitter');
var keys = require("./keys.js")
var request = require("request");
var Spotify = require('node-spotify-api');


var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});
var client = new Twitter(keys.twitter);


switch (process.argv[2]) {
    case 'my-tweets':
        console.log(client);
        break;
    case 'spotify-this-song':
        // console.log(spotify);


        spotify.search({ type: 'track', query: process.argv[3], limit: 1 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }           
            console.log("Artist's Name: " + data.tracks.items[0].album.artists[0].name);
            console.log("Album Name: " + data.tracks.items[0].album.name);
            console.log("Song Name: " + data.tracks.items[0].name);
            console.log("Song Url: " + data.tracks.items[0].external_urls.spotify);
        });


        // spotify
        //     .request("https://api.spotify.com/v1/search?q=name:one%20artist:metallica&type=track&limit=10")
        //     .then(function (data) {
        //         console.log(data.artists);
        //         console.log(data);
        //     })
        //     .catch(function (err) {
        //         console.error('Error occurred: ' + err);
        //     });











        break;
    case `movie-this`:
        if (process.argv[3] === undefined) {
            var queryUrl1 = "http://www.omdbapi.com/?t=Mr-Nobody&y=&plot=short&apikey=trilogy";

            request(queryUrl1, function (error, response, body) {
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
        } else {
            var movieName = process.argv[3];
            var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
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
        }

        break;
    case `do-what-it-says`:
        console.log(client);
        break;




}