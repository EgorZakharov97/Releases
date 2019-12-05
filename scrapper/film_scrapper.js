const DEBUG = false
const fetchData = require('./exports').fetchData

const Movie = require('../models/movie-model')
const URL = 'https://www.cinemaclock.com/movies/upcoming'
const prefix = 'https://www.cinemaclock.com'

const getMovies = async function(){
    console.log('Updating movies...')
    const $ = await fetchData(URL)

    return new Promise(() => {
        $('.BD.dateHD').each((i, releaseDate) => {
            let date = new Date(Date.parse($(releaseDate).find('.bull').text())).toString()
            $(releaseDate).find('.movieblock').each((i, eachMovie) => {
                let movie = {date: date}
                movie.image = prefix + $(eachMovie).find('.smallposter.lazy').attr('data-src')
                let link = $(eachMovie).find('h3 > a')
                movie.name = link.text()
                movie.link = prefix + link.attr('href')
                resolveDescription($(eachMovie).find('.moviegenre').text(), movie)
                if(DEBUG){
                    console.log(movie)
                } else {
                    Movie.find({name: movie.name}, (err, found) => {
                        if(err){
                            throw err
                        } else if(found) {
                            movie.kind = 'Movie'
                            if(found._id){
                                Movie.findByIdAndUpdate(movie)
                            } else {
                                Movie.create(movie)
                            }
                        }
                    })
                }
            })
        })
    }).catch((err) => {
        console.log('Error!!!!!\n' + err)
    })
}

function resolveDescription(string, movie){
    let split = string.split('•')
    
    if(split.length == 3){
        movie.duration = split[0]
        movie.genre = split[1]
        movie.authors = split[2]
    } else if(split.length == 2){
        movie.genre = split[0]
        movie.authors = split[1]
    } else {
        movie.genre = string
    }
}

if(DEBUG){
    getMovies()
}

module.exports = getMovies