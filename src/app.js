const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geomaping = require('./utils/geocode');


const app = express()
const port = process.env.PORT || 3000

// define paths for Express calling
const publicDirPath = path.join(__dirname,'../public')
const viewDirPath = path.join(__dirname, '../templates/views') 
const partialDirPath = path.join(__dirname, '../templates/partials')

// by default template is in views folder
// setup handelbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewDirPath) // pointing views from deafult view folder to antoher folder
hbs.registerPartials(partialDirPath)

// setup static directory to serve
app.use(express.static(publicDirPath))

// route handlers
app.get('', (req, res) => {
    res.render('index', {
        title:'Weather',
        author : 'Saurabh'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About page',
        author : 'Saurabh Maurya'
    })
})

app.get('/help', (req, res) => {
    //  res.send('Help Page')
    res.render('help', {
        title:'help page',
        message : 'This is help message',
        author : 'Saurabh'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error : 'No Address Provided!'
        })
    }

    geomaping(req.query.address, (error, {latitude , longitude, location} = {}) => {
        if (error) {
            return res.send({
                error : error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error : error
                })
            }
            res.send({
                location : location,
                forecast : forecastData,
                address : req.query.address
            })
        })
    })


    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error_msg : 'Help Article not found',
        author : 'Saurabh'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error_msg : 'My 404 page',
        author : 'Saurabh'
    })
})



//starting server on specified port
app.listen(port, () => {
    console.log('Server started listening at port ' + port)
})