var weatherstation=require('./../../models/weatherStationSchema');
var state=require('./../../models/stateSchema');
var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
    weatherstation.find()
           .populate('state')
        .exec((err,weatherstation) => {
            if (err){return console.log(err)}
            res.json(weatherstation);
        });
});
router.get('/:id',function (req,res,next){
    var id= req.params.id;
    weatherstation.findById(id).populate('state').exec(function (err,weatherStation) {
        if(err){
            res.send(err);
        }
        if(!weatherStation){
            res.sendStatus(404);
        }
        else {
            res.json(weatherStation);
        }
    });
});
router.post('/',function (req,res) {
    var WeatherStation =new weatherstation(req.body);
    WeatherStation.save(function(err,NewObject){
        if (err)
            res.send(err);
        else
            res.send(NewObject);
    });
});

module.exports = router;
