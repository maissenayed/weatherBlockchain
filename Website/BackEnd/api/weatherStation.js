var weatherStation=require('./../models/weatherStationSchema');
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    weatherStation.find(function (err,weatherStation) {
        if(err) {
            res.send(err);
            console.log('err');
        }
        if(!weatherStation) {
            res.status(404).send();
            console.log('weatherStation');
        }
        else {
            res.json(weatherStation);
            console.log(weatherStation);
        }
    });
});

module.exports = router;
