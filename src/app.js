const path = require('path')
const express = require('express')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const hbs = require('hbs')
//Define path for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicPath))
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Kaushal Kumar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Kaushal Kumar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpfultext: "This is some helpful text",
        title: 'Help',
        name: 'Kaushal'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide an address.'
        })
    }
    geocode(req.query.address,( error,{latitude,longitude,location} = {}) =>{
        if(error){
           return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     address: req.query.address,
    //     forecast: 'Cloudy',
    //     location: 'Godda Jharkhand'
    // })
})

app.get('/products',(req,res) =>{
    if(!req.query.search){
      return res.send({
            error:'You must proovide something to search'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('error404', {
        title: '404',
        name: 'Kaushal Kumar',
        errorMessage: 'Help not found.'
    })
})

app.get('*', (req, res) => {
    res.render('error404', {
        title: '404',
        name: 'Kaushal Kumar',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})

// set up static directory to  serve
// app.com


