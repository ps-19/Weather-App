const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const query=process.argv[2]

if(!query){
    console.log('Please provide an address !!')
}
else{
    geocode(query,(error,data)=>{     // data={latitude, longitude, location}
        if(error){
            return console.log(error)
        }
        console.log(data.location)
        console.log("Latitude:",data.latitude)
        console.log("Longitude:",data.longitude)
        forecast(data.latitude, data.longitude, (error, data)=>{
            if(error){
                console.log('Error from weather API:', error)
            }
            else{
                console.log(data)
            }
        })
    })
}










// request({url: url, json: true}, (error, response)=> {
//     if(error){
//         console.log('Nahi Mila')
//     }
//     else{
//         if(response.body.error){
//             console.log(chalk.magenta.inverse(response.body.error))
//         }
//         else{
//             console.log(response.body)
//         }
//     }
// })