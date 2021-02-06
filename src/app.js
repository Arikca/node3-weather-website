const path= require("path");
const express= require('express');
const hbs= require('hbs');
const geocode  = require('./utils/geocode');
const forecast= require('./utils/forecast');

//console.log(path.join(__dirname, '../public'));
const app = express();


const staticPath= path.join(__dirname, '../public');
//app.use(): customizing the folder
app.use(express.static(staticPath));

//to setup aview engine
app.set('view engine','hbs');

app.get("", (req, res)=> {
    res.render("index", {
        title: "weather App",
        name: "Arica"
    });
});

app.get("/about", (req,res)=> {
    res.render("about", {
       about: "Theweather" 
    })
});

app.get("/help", (req, res)=> {
    res.render("help", {
        help: "the help page"
    })
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "you must provide an address"
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {})=> {
        if(error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData)=> {
            if(error){
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });


    // res.send({
    //     forecast: "Its amazing",
    //     address: req.query.address
    // });
});

app.get("/help/*", );

app.get("*", (req, res) => {
    res.render("404",{
        title: "a",
        error: "404 error",
        name: "arica"
    });
});

app.listen(3000, () => {
    console.log("server is up and running");
});