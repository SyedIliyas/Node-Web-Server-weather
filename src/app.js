const path = require('path')

const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// define paths for express config
const publicDirectoryPath= path.join(__dirname,'../public')
const viewPath=path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//setup handlers engine and views location 
app.set('views',viewPath )
app.set('view engine', 'hbs')
hbs.registerPartials(partialPath)

//setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Syed Iliyas'
    })
})

app.get('/about',(req,res)=>{
    res.render('about', {
        title: 'About',
        name: 'Syed Iliyas'
    })
})

app.get('/help',(req,res)=>{
    res.render('help', {
        title: 'Help',
        text: 'this is some helpful text',
        name: 'Syed Iliyas '
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please enter address'
        })
    }else{
        geocode(req.query.address,(error,{longitude,latitude,location}={}) =>{
            if(error){
                return res.send({
                    error
                })
            }
            forecast (longitude,latitude,  (error, forecastData) => {
                if(error){
                    return res.send(error)
                }
                return res.send({
                    location: location,
                    forecast: forecastData,
                    address: req.query.address
                })
              
            })
                    
        })
    }

})



app.get('/help/*' , (req,res)=>{
    res.render('404',{
        title: ' 404',
        name: 'syed iliyas',
        ErrorMessage:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'syed Iliyas',
        ErrorMessage:'Page not found'
    })
})


// app.com
// app.com/Help 
// app.com/about 

app.listen(3000, ()=>{
    console.log('web server is up on port 3000')
})