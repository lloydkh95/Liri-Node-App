//require .env file
require("dotenv").config();

//require request
let request = require("request");

//require moment
const moment = require("moment");

//require file systems
const fs = require("fs");

//Link key page
const keys = require("./keys.js");

//initialize spotify
const Spotify = require("node-spotify-api");
const Spotify2 = new Spotify(keys.spotify);

// OMDB and BANDS command and input
let omdb = (keys.omdb);
let bandsintown = (keys.bandsintown);

// take user comand and input
let userInput = process.argv[2];
let userQuery = process.argv.slice(3).join(".");

//APP lOGIC
function userCommand(userInput, userQuery) {
    // make a decision based on the command
    console.log(userInput);
    switch (userInput) {
        case "concert-this":
            concertThis();
            break;
        case "spotify-this":
            spotifyThisSong();
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-this":
            doThis();
            break;
        default:
            console.log("I don't understand");
            break;
    }
}

userCommand(userInput, userQuery);

function concertThis() {
    console.log(`\n = = = = =\n\nSEARCHING FOR...${userQuery}'s next show...`);
    // USER REQUEST AS OUR QUERY URL USING OUR USER QUERY VARIABLE AS THE PARAMETERS OF OUR SECTION
    request("https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=" + bandsintown,
        function (error, response, body) {
        //IF THERE IS NO ERROR GITVE US A 200 STATUS CODE (EVERYTHING OK!)
        if (!error && response.statusCode === 200) {
            // CAPTURE DATA AND USE JSON TO FORMAT
            let userBand = JSON.parse(body);
            // PARSE DATA AND USE FOR LOOP TO ACCESS PATHS TO DATA
            if (userBand.length > 0) {
                for (i = 0; i < 1; i++) {

                    // CONSOLE LOG DESIRED DATA USING E6 SYNTAX
                    console.log(`\nBAM! That's for you...\n\nArtist: ${userBand[i].lineup[0]} \nVenue: ${userBand[i]
                        .venue.name}\nVenue Location: ${userBand[i].venue.lattitude},${userBand[i].venue.longitude}\nVenue City:
                    ${userBand[i].venue.city}, ${userBand[i].venue.country}`)

                    // MOMENT.JS TO FORMAT THE DATE
                    let concertDate = moment(userBand[i].datetime).format("MM/DD/YYY hh:00 A");
                    console.log(`Date and Time: $(concertDate)\n\n= = = = =`);
                };

            } else {
                console.log(`Band or concert not Found!`);
            };
        };
    });
};

function spotifyThisSong() {
    console.log(`\n = = = = =\n\nSEARCHING FOR..."${userQuery}"`);

    //IF USER QUERY NOT FOUND, PASS VALUE OF "ACE OF BASE"
    if (!userQuery) { userQuery = "the sign ace of bas" };

    // SPOTIFY SEARCH QUERY FORMAT
    Spotify2.search({ type: 'track', query: userQuery, limit: 1 }, function (error, data) {
        if (error) {
            return console.log('Error ocurred: ' + error);
        }
        // COLLECT SELECTED DATA IN AN ARRAY
        let spotifyArr = data.tracks.items;

        for (i = 0; i < spotifyArr.length; i++) {
            console.log(`\nBAM! That's for you...\n\nartists: ${data.tracks.items[i].album.artists[0].name} \nSong: 
            ${data.tracks.items[i].name}\nSpotify link: ${data.tracks.items[i].external_urls.spotify}\nAlbums:
            ${data.tracks.items[i].album.name}\n\n = = = = =`)
        };
    });
};

function movieThis() {
    console.log(`\n = = = = = \n\nSEARCHING FOR..."${userQuery}"`);
    if (!userQuery) { userQuery = "mr nobody"; };
    // REQUEST USING OMDB API
    request("http://www.omdbapi.com/?t=" + userQuery + "&apikey=86fe999c", function (error, request, response){
        console.log(response);
        let userMovie = JSON.parse(response);   
    
    

    // CAPTURE ROTTEN TOMATOES RATING INTO AN ARRAY
    let ratingsArr = userMovie.Ratings;
    if (ratingsArr.length > 2) {
    }

    if (!error && response.statusCode === 200) {
        console.log(`\nBam! That's for you...\n\nTitle: ${userMovie.Title}\ncast: ${userMovie.Actors}\nRealeased:
            ${userMovie.Year}\nIMDB Rating: ${userMovie.imdbRating}\nRotten Tomatoes Rating: ${userMovie.Ratings[1].Value}
            \nCountry: ${userMovie.Country}\nLanguage: ${userMovie.Language}\nPlot: ${userMovie.Plot}\n\n = = = = =`)
    }
    else {
        return console.log("Movie able to be found. Error:" + error)
    }; })
}


function doThis() {
    // UTILIZE THE BUILT IN READFILE METHOD TO ACCESS RANDOM.TEXT
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) { return console.log(error); }
        // CATCH DATA AND USE THE SPLIT METHOD TO SEPERATE OBJECTS WITHIN OUR NEW ARRAY
        let dataArr = data.split(",");

        // TAKE OBJECTS FROM RANDOM TEXT TO PASS AS PARAMETERS
        userInput = dataArr[0];
        userQuery = dataArr[1];
        // CALL OUR FUNCTION WITH OUR NEW PARAMETERS...
        userCommand(userInput, userQuery);
    });
};