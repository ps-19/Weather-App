const request = require('request')
const chalk = require('chalk')

const forecast=(longitude,latitude,callback) => {
    const url="https://api.darksky.net/forecast/ef45b326d9ffc32e626606f96db36df1/"+longitude+",%20"+latitude+""
    request({url: url, json: true},(error,response)=>{
        // console.log(url)
        if(error){
            callback(("Access Denied by weather API!"), undefined) // API wrong
        }
        else if(response.body.error){
            callback(("Dark Sky API access denied"), undefined) // API access denied
        }
        else{
            callback(undefined,response.body)
        }
    })
}

module.exports=forecast