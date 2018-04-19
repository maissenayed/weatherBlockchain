var state = require('./../../models/stateSchema');
var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/gmap/:country/:state',(req,res,next)=>{
    var GEOCODE_API = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyD5PrQC4WPoZRSi7waFLcOj9EF1V3bMrXc&sensor=false&components='
        + 'country:' + req.params.country + '&address=' + req.params.state + '';
    request(GEOCODE_API, function (error, response, body) {
        res.json(JSON.parse(body))
    });
});
router.get('/:name', function (req, res, next) {
    var name= req.params.name;
    state.find({name:name})
        .populate('country', 'name')
        .exec(function (err,stateFound) {
        if(err){
            res.send(err);
        }
        if(!stateFound){
            res.sendStatus(404);
        }
        else {
            res.json({
                    text:stateFound[0].name,
                    _id:stateFound[0]._id,
                    country:stateFound[0].country[0].name
            });
        }
    });
});

module.exports = router;
