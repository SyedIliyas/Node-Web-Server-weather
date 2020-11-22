const request = require('request')


const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fb522c446e90ce0a452ec833c66b8089&query='+latitude+','+longitude+'&units=m'
    
    request({url, json: true}, (error,{body}) => {
        
        if (error){
            callback('unable to connect to location service', undefined)
        }else if(body.error){
            callback('unable to find location, try another location',undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0]+', It is currently '+ body.current.temperature+ ' degrees out. it feels like '+body.current.feelslike+' degrees out')
        }

    })

}

module.exports = forecast