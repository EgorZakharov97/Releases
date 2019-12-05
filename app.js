const mongoose = require('mongoose'),
    readline = require('readline')

const updateMovies = require('./scrapper/film_scrapper'),
    updateGames = require('./scrapper/game_scrapper')

mongoose.connect("mongodb://localhost/releases", {useNewUrlParser: true, useUnifiedTopology: true});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

console.log("--------")
console.log("RELEASES")
console.log("--------")
console.log("\nEnter new command")

rl.on('line', input => {
    let split = input.split(' ')
    switch(split[0]){
        case 'update':
            if(split[1] == 'movies'){
                updateMovies()
            } else if(split[1] == 'games'){
                updateGames()
            } else if(split[1] == undefined){
                console.log("\nShould be with parameter")
            } else {
                console.log("\nUnknown parameter: " + split[1])
            }
            break
        case 'help':
            console.log("\nAcailable commands:")
            console.log("update")
            console.log("    games")
            console.log("    movies")
            console.log("help")
            break
        default:
            console.log("\nUnknown command: " + input)
            console.log("Try 'help' to get help")
            break
    }
})