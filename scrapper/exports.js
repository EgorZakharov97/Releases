const axios = require('axios')
const cheerio = require('cheerio')

module.exports = {
    fetchData: async function(URL){
        const result = await axios.get(URL)
        return cheerio.load(result.data)
    },

    updateItem: function(item, Model){
        Model.find({name: item.name}, function(err, found){
            if(err){
                throw err
            } else {
                if(found._id){
                    found = item
                    found.save()
                } else {
                    Model.create(item, function(err, newItem){
                        if(err){
                            throw err
                        }
                    })
                }
            }
        })
    }
}