const request = require('request')
const chalk = require('chalk')

const forecast=(longitude,latitude,callback) => {
    const url="https://api.darksky.net/forecast/ef45b326d9ffc32e626606f96db36df1/"+longitude+",%20"+latitude+""
    request({url: url, json: true},(error,response)=>{
        if(error){
            callback(chalk.magenta.inverse("Access Denied by weather API!"), undefined) // API wrong
        }
        else if(response.body.error){
            callback(chalk.blue.inverse("Dark Sky API access denied"), undefined) // API access denied
        }
        else{
            callback(undefined,response)
        }
    })
}

module.exports=forecast