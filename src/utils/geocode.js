const request = require('request')


const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic3llZGlsaXlhczcxMSIsImEiOiJja2hpYnM3MWMxa21hMnRwamRra3VpZmk3In0.NyHzNnb4IoHv0FoDAA-_5w&limit=1'

    request({url, json:true}, (error,{body}) => {

        if(error){
            callback('unable to connect to location service', undefined)

        }else if(body.features.length === 0){
            callback('unable to find location, try another location',undefined)

        }else{
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    }) 

}

module.exports = geocode