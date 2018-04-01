//test api for various code test not to bother with
var state=require('./../models/stateSchema');
var Country=require('./../models/countrySchema');
var user = require("./../libs/User");
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    state.find()
        .populate({path:'country',options:{ sort: { 'hmapCode': -1 } }})
    .exec((err,state) => {
        if (err){return console.log(err)}
        res.json(state);
    });
});
/* GET home page. */
router.get('/c', function(req, res, next) {
    Country.find(function (err,country) {
        res.json(country);
    })
});
router.get('/m',user.UserTransaction);
module.exports = router;