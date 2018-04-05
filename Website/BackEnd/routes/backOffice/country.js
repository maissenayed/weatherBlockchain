var country = require('./../../models/countrySchema');
var state = require('./../../models/stateSchema');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    country.find({}, 'name isoCode', function (err, countries) {
        countries = countries.map(function (obj) {
            return {
                text: obj.name,
                isoCode: obj.isoCode
            }
        });
        res.json(countries);
    }).sort({name: 1})
});
router.get('/:idOrName', function (req, res, next) {
    var id = req.params.idOrName;
    if (id.length >10) {

        country.findById(id).exec(function (err, countryFound) {
            if (err) {
                return res.send(err);
            }
            if (!countryFound) {
                return res.sendStatus(404);
            }
            else {
                return res.json({
                    text: countryFound.name,
                    isoCode: countryFound.isoCode
                });
            }
        });
    }
    else {
        country.find({name: id}).exec(function (err, countryFound) {
            if (err) {
                return res.send(err);
            }
            if (!countryFound ) {
                return res.sendStatus(404);
            }
            else {
                return res.json({
                    text: countryFound[0].name,
                    isoCode: countryFound[0].isoCode
                });
            }
        });
    }
});

router.get('/:country_name/states', function (req, res, next) {
    var cname = req.params.country_name;

    state.find({}, 'country name')
        .populate('country', 'name')
        .sort({name: 1})
        .exec((err, states) => {
            if (err) {
                return console.log(err)
            }
            var filteredStates = states.filter((state) => {
                return state.country[0].name === cname;
            });
            filteredStates = filteredStates.map(function (obj) {
                return {
                    text: obj.name,
                    _id: obj._id
                }
            });
            res.json(filteredStates);
        })
    /*state.find({},'country name')
        .populate('country',null,{name:{$in:['Tunisia']}})
        .exec((err,states)=>{
            if (err) console.log(err);
            res.json(states);
        });*/
    /*state.aggregate([
        {
            $project: {
                country:{
                    $filter:{
                       input:"$country",
                       as:"c",
                       cond:{$in:["$$c.name",cname]}
                    }
                }
            }
        }
    ])
        .exec((err, states) => {
            if (err) console.log(err);
            res.json(states);
        });*/
});

module.exports = router;
