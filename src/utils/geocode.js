const request=require('request')
const chalk=require('chalk')

const geocode=(address,callback)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoidmFuYXlhOTg5NCIsImEiOiJja3V3emRkd20ydXVkMndxcmxjcWgyZjJhIn0.VA0nfz3yD8lg8TRbNoZIeQ&limit=1"
    request({url: url, json: true},(error, response) => {
        if(error){
            callback('Permission Denied by Mapbox API!', undefined)
        }
        else if(response.body.features.length === 0){
            callback('Location Does Not Exit in Mapbox Data!', undefined)
        }
        else{
            const data={
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            }
            // console.log(data.location)
            callback(undefined, data)
        }
    })

}

module.exports=geocode
