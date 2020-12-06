const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherapi.com/v1/forecast.json?key=80d2a867c1734ea0ae4213216200212&q='+latitude+','+longitude+'&days=1'
    request({url, json : true}, (error, {body}) => { // response.body
        if(error) {
            callback('Unable to connect weather api', undefined)
        } else if(body.error){
            callback('Unable to find weather data', undefined)
        } else {
            callback(undefined, `It is currently ${body.current.temp_c} degree celcius and ${body.current.precip_in} inches precipetation out there. And the condition is ${body.current.condition.text}`)
        }
    })
}


module.exports = forecast