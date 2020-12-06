 const request = require('request');


const geomaping = (address, callback) => {
    //const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(address)+ '.json?limit=1&access_token=pk.eyJ1Ijoic2F1cmFiaDExMjgiLCJhIjoiY2tpOGlodDhsMDYzMTJ6bGN0ZmRrdjd2NiJ9.C0dChsmklXEqxLF7CAKMTQ'
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&access_token=pk.eyJ1Ijoic2F1cmFiaDExMjgiLCJhIjoiY2tpOGlodDhsMDYzMTJ6bGN0ZmRrdjd2NiJ9.C0dChsmklXEqxLF7CAKMTQ`
    request({url, json : true}, (error, {body}) => { //respone.body befor destructring , shorthand for url too
        if(error) {
            callback('Unable to connect to the network', undefined)
        } else if(body.features.length === 0) {
            callback('Unable to find the location', undefined)
        } else {
            callback(undefined, {
                longitude : body.features[0].center[0],
                latitude : body.features[0].center[1],
                location : body.features[0].place_name
            })
        }
    })
}


module.exports = geomaping