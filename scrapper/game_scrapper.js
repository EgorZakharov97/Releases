const DEBUG = false
const fetchData = require('./exports').fetchData
const upload = require('./exports').updateItem

const Game = require('../models/game-model')
const URL = 'https://www.gameinformer.com'

const getGames = async function(){
    console.log('Updating games...')
    let $ = await fetchData(URL + '/2020')
    grabLinks($).forEach(async function(link) {
        $ = await fetchData(link)
        let game = {kind: 'Game'}
        resolveGame($, game)
        if(DEBUG){
            console.log(game)
        } else {
            upload(game, Game)
        }
    })
}

function resolveGame($, game){
    game.name = $('#block-gi5-content > article > div > div.blurred-header-content > div > div.blurred-header-right > h1 > span').text()
    game.image = $('#block-gi5-content > article > div > div.blurred-header-content > div > div.blurred-header-left > div > img').attr('src')
    $('#block-gi5-content > article > div > div.blurred-header-content > div > div.blurred-header-right > div > div > div > div > div > div > span').find('.field__wrapper').each((i, wrapper) => {
        let key = $(wrapper).find('.field__label').text().trim()
        key = key.slice(0, key.length - 1).toLowerCase()
        if(key == 'release date'){
            key = 'date'
        }
        game[key] = $(wrapper).find('.field__items').text().trim()
    })
}

function grabLinks($) {
    let links = []
    const body = $('.clearfix.text-formatted.field')

    $(body).find('.calendar_entry').each((j, entry) => {
        links.push(URL + $(entry).find('a').attr('href'))
    })
    return links
}

if(DEBUG){
    getGames()
}

module.exports = getGames