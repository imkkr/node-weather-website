const request = require('request')
 
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&appid=8a2c9f6d55f3415495d1abe56641dd67';
    request({ url, json: true }, (error, {body}) =>{
        if(error){
            callback('Unable to connect to weather services', undefined)
        }
        else if(body.cod === "400") {
            callback('Please check the coordinates or try a different location',undefined)
        }
        else{
            callback(undefined, {
                current_temperature: body.current.temp,
                feels_like: body.current.feels_like,
                weather: body.current.weather[0].description

            })
        }
    })
}

module.exports = forecast ;