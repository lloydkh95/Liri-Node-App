liri-node-app
Week 10 (LIRI Bot) Assignment

Created during Week 10 of UCF Coding Bootcamp. The challenge was to use Node JS to create a LIRI bot, like iPhone's SIRI, but takes in command through Language vs Speech. LIRI is a command line node app that takes in parameters and returns data based on one of three commands:
concert-this

spotify-this-song

movie-this

do-what-it-says

Getting Started
Clone down repo.
Run command 'npm install' in Terminal or GitBash
Run command 'node liri.js' or one of the commands below.
What Each Command Does
node liri.js concert-this <artist/band>
Shows the following information about the song in terminal/bash window.
Name of the venue OR event
location of the venue
and the date of the event

node liri.js spotify-this-song <song name>
Shows the following information about the song in terminal/bash window.

Artist(s)
The song's name
A preview link of the song from Spotify
The album that the song is from
Or if no song is passed through, it will default to error.

node liri.js movie-this <movie name>
Shows the following information in terminal/bash.

Title of the movie.
Year the movie came out.
IMDB Rating of the movie.

Rotten Tomatoes Rating.
Rotten Tomatoes URL.

node liri.js do-what-it-says
Takes the text from random.txt and runs the song through spotify-this-song command
Tech used
Node.js
Spotify NPM Package - https://www.npmjs.com/package/spotify
Request NPM Package - https://www.npmjs.com/package/request
Axios NPM Package - https://www.npmjs.com/package/axios
OMDB API - http://www.omdbapi.com
Bands In Town API - http://www.artists.bandsintown.com/bandsintown-api
Moment NPM Package - https://www.npmjs.com/package/moment
DotEnv NPM Package - https://www.npmjs.com/package/dotenv

Prerequisites
- Node.js - Download the latest version of Node https://nodejs.org/en/
Built With
Sublime Text - Text Editor
Author
Lloyd Humphries
link to video that displays the functions being used
https://drive.google.com/file/d/1Nz3y9i_BIXGr40S8Ti6kK47Op4RVLatS/view
