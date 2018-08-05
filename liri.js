require("dotenv").config();

var keys = require("./keys.js")
var request = require("request");

// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);


switch (process.argv[2]) {
    case 'my-tweets':
        console.log(client);
        break;
    case 'spotify-this-song':
        console.log(spotify);
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