const request = require('request');

const geocode = (address, callback) => {
   const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaW1ra3IiLCJhIjoiY2tkaG9naGJ6MDFwZTJzcHVvM2VkOHRmbSJ9.BY8UkYY5LKZzvQL2xtWQ4w&limit=1'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to Connect.', undefined)
        }
        else if (body.features.length == 0) {
            callback('Unable to find loaction.Try a different location.',undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports =  geocode ;