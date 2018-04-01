var weatherData=require('./../models/weatherDataSchema');
var State=require('./../models/stateSchema');
var express = require('express');
var router = express.Router();
//full world map temp,humidity ,pressure
router.get('/fullMap', function(req, res, next) {
    let query= weatherData;
    query.aggregate([
        {$match: {'timestamp':{ $gt: new Date(Date.now() - (1000 * 60 * 60 * 24)) }}},
        { $sort: {  'timestamp': 1 } },
        {$group: {"_id":{ state:'$state',country:'$coord.country_code'},latestDate: { $last: "$timestamp" },
                avgTemp: { $avg: "$main.temp" },maxTemp: { $max: "$main.temp" },minTemp: { $min: "$main.temp" },
                avgHumidity: { $avg: "$main.humidity" },maxHumidity: { $max: "$main.humidity" },minHumidity: { $min: "$main.humidity" },
                avgPressure: { $avg: "$main.pressure" },maxPressure: { $max: "$main.pressure" },minPressure: { $min: "$main.pressure" },
                doc: {$first: "$$ROOT"}}},
        { $project : { _id:1, InstantWeatherData: "$doc",
                avgTemp:1,avgHumidity:1,avgPressure:1,
                maxTemp:1,minTemp:1,minHumidity:1,minPressure:1,maxHumidity:1,maxPressure:1,
            }},
        {$group: {"_id":{country:'$_id.country'},
                avgTemp: { $avg: "$avgTemp" },maxTemp: { $max: "$maxTemp" },minTemp: { $min: "$minTemp" },
                avgHumidity: { $avg: "$avgHumidity" },maxHumidity: { $max: "$maxHumidity" },minHumidity: { $min: "$minHumidity" },
                avgPressure: { $avg: "$avgPressure" },maxPressure: { $max: "$maxPressure" },minPressure: { $min: "$minPressure" },
            }},
        { $sort: {  '_id.country': 1 } },
    ])
        .exec((err,weatherstation) => {
            if (err){return console.log(err)}
            let pointstemp = [];
            let pointsHumidty = [];
            let pointsPressure = [];
            weatherstation.forEach(function(element) {
                let dataTemperateur =[element._id.country,element.avgTemp];
                let dataHumidity =[element._id.country,element.avgHumidity];
                let dataPressure =[element._id.country,element.avgPressure];
                pointstemp.push(dataTemperateur);
                pointsHumidty.push(dataHumidity);
                pointsPressure.push(dataPressure)
            });
            let result = new Object();
            result.hmap=new Object();
            result.hmap.temp = pointstemp;
            result.hmap.Humidity= pointsHumidty;
            result.hmap.pressure=pointsPressure;
            result.weatherdata=weatherstation;
            res.json(result);


        });
});
//range of temperateur
router.get('/range/temp', function(req, res, next) {
    var maxTemp= req.query.maxtemp;
    var minTemp= req.query.mintemp;
    weatherData.find({'timestamp':{ $gt: new Date(Date.now() - (1000 * 60 * 60 * 24)) }}).where('main.temp').gt(minTemp).lt(maxTemp)
        .exec((err,weatherstation) => {
            if (err){return console.log(err)}
            res.json(weatherstation);
        });
});
//range of humidity
router.get('/range/humidity', function(req, res, next) {
    var maxHumidity= req.query.maxHumidity;
    var minHumidity= req.query.minHumidity;
    weatherData.find({'timestamp':{ $gt: new Date(Date.now() - (1000 * 60 * 60 * 24)) }}).where('main.humidity').gt(minHumidity).lt(maxHumidity)
        .exec((err,weatherstation) => {
            if (err){return console.log(err)}
            res.json(weatherstation);
        });
});
//range of humidity
router.get('/range/pressure', function(req, res, next) {
    var maxPressure= req.query.maxPressure;
    var minPressure= req.query.minPressure;
    weatherData.find({'timestamp':{ $gt: new Date(Date.now() - (1000 * 60 * 60 * 24)) }}).where('main.pressure').gt(minPressure).lt(maxPressure)
        .exec((err,weatherstation) => {
            if (err){return console.log(err)}
            res.json(weatherstation);
        });
});
//country world map
router.get('/fullMap/:country', function(req, res, next) {
    let country= req.params.country;
    let query= weatherData;
    query.aggregate([
        {$match: {'timestamp':{ $gt: new Date(Date.now() - (1000 * 60 * 60 * 24)) },'coord.country_code':country}},
        {$group: {"_id":{ state:'$state'},latestDate: { $last: "$timestamp" },
                avgTemp: { $avg: "$main.temp" },maxTemp: { $max: "$main.temp" },minTemp: { $min: "$main.temp" },
                avgHumidity: { $avg: "$main.humidity" },maxHumidity: { $max: "$main.humidity" },minHumidity: { $min: "$main.humidity" },
                avgPressure: { $avg: "$main.pressure" },maxPressure: { $max: "$main.pressure" },minPressure: { $min: "$main.pressure" },
                doc: {$first: "$$ROOT"}}},
        { $project : { _id:0, InstantWeatherData: "$doc",
                avgTemp:1,avgHumidity:1,avgPressure:1,maxTemp:1,minTemp:1,minHumidity:1,minPressure:1,maxHumidity:1,maxPressure:1,

            }},
    ])
        .exec((err,weatherstation) => {
            if (err){return console.log(err)}
            let pointstemp = [];
            let pointsHumidty = [];
            let pointsPressure = [];
            weatherstation.forEach(function(element) {
                let dataTemperateur =[element.InstantWeatherData.coord.country_code+"-"+element.InstantWeatherData.coord.state_code,element.InstantWeatherData.main.temp];
                let dataHumidity =[element.InstantWeatherData.coord.country_code+"-"+element.InstantWeatherData.coord.state_code,element.InstantWeatherData.main.humidity];
                let dataPressure =[element.InstantWeatherData.coord.country_code+"-"+element.InstantWeatherData.coord.state_code,element.InstantWeatherData.main.pressure];
                delete element.InstantWeatherData.state;
                delete element.InstantWeatherData._id;
                delete element.InstantWeatherData.sys;
                delete element.InstantWeatherData.coord.lng;
                delete element.InstantWeatherData.coord.lat;
                pointstemp.push(dataTemperateur);
                pointsHumidty.push(dataHumidity);
                pointsPressure.push(dataPressure)
            });
            let result = new Object();
            result.hmap=new Object();
            result.hmap.temp = pointstemp;
            result.hmap.Humidity= pointsHumidty;
            result.hmap.pressure=pointsPressure;
            result.weatherdata=weatherstation;
            res.json(result);


        });
});
//10 last entries of weather data
router.get('/', function(req, res, next) {
    weatherData.find().sort('-timestamp').limit(10)
        .exec((err,weatherstation) => {
            if (err){return console.log(err)}
            res.json(weatherstation);
        });
});
//10 last entries of weather data of state
router.get('/fullMap/:country/:state', function(req, res, next) {
    let country= req.params.country;
    let state= req.params.state;
    console.log(state);
    let query= weatherData;
    query.aggregate([
        {$match: {'timestamp':{ $gt: new Date(Date.now() - (1000 * 60 * 60 * 24)) },'coord.country_code':country,'coord.state_code':state}},
        { $limit : 10 }
    ])
        .exec((err,weatherstation) => {
            if (err){return console.log(err)}
            res.json(weatherstation);


        });
});
//post weather data by raspberrypies (weather station)
router.post('/',function (req,res) {
    console.log( req.body);
    var newWeatherData=new weatherData(req.body);
    newWeatherData.save(function (err,newWeatherData) {
        if(err)
            res.send(err);
        else
            res.send(newWeatherData);
    });
});
module.exports = router;
