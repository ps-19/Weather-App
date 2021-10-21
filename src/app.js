const path=require('path')
const express=require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

console.log(path.join(__dirname,'../../web-servers/public'))


//Define path for public and views folder
const PublicDirectoryPath = path.join(__dirname,'../public')  //static file path
const viewsPath = path.join(__dirname,'../template/views')
const PartialPath = path.join(__dirname, '../template/partials')


// setting up routes for .hbs files in views
app.set('view engine', 'hbs')  // dynamic file rendering
app.set('views', viewsPath)
hbs.registerPartials(PartialPath)  // added partials page


// setting up static file route
app.use(express.static(PublicDirectoryPath)) // static file rendering


app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather',
        desc: 'This is HOME page',
        name: 'Priyansh Singh'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title: 'Help',
        desc: 'This is Help page',
        name: 'Priyansh Singh'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title: 'About',
        desc: 'This is About page',
        name: 'Priyansh Singh'
    })
})

app.get('/weather',(req, res)=>{
    
    if(!req.query.address){
        return res.send({ error: 'Please Provide an address !!'});
    }

    geocode(req.query.address, (error, {latitude, longitude} = {}) => { // longitude , latitude destructing
        if(error){
            return res.send({error: error})
        }
        // const latitude = data.latitude
        // const longitude = data.longitude
        // const location = data.location
        forecast(latitude, longitude, (error, data2) => {
            if(error || data2.body.length === 0){
                res.send({error: error})
            }
            else{
                res.send({ data2 })
            }
        })
    });
})

app.get('/author/*', (req, res) => {
    res.render('404',{
        title: ' Post 404',
        name: 'Priyansh Singh'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Priyansh Singh'
    })
})

app.listen(port ,()=>{
    console.log("PORT running at "+port)
})