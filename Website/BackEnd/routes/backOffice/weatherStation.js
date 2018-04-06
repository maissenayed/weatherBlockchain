var weatherstation = require('./../../models/weatherStationSchema');
var state = require('./../../models/stateSchema');
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
router.get('/', function (req, res, next) {
    weatherstation.find()
        .populate('state')
        .exec((err, weatherstation) => {
            if (err) {
                return console.log(err)
            }
            res.json(weatherstation);
        });
});
router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    weatherstation.findById(id).populate('state').exec(function (err, weatherStation) {
        if (err) {
            res.send(err);
        }
        if (!weatherStation) {
            res.sendStatus(404);
        }
        else {
            res.json(weatherStation);
        }
    });
});
router.post('/', function (req, res) {
    var WeatherStation = new weatherstation(req.body);
    WeatherStation.save(function (err, NewObject) {
        if (err)
            res.send(err);
        else
            res.send(NewObject);
    });
});
router.delete('/:id', function (req, res) {

    var id = req.params.id;
    weatherstation.findByIdAndRemove({_id: id}, function (err, wsFound) {
        if (err)
            res.send(err);
        else
            res.send(202);
    });

});
router.put('/:id', function (req, res) {
    var id = req.params.id;
    var state_id = mongoose.Types.ObjectId(req.body.state._id);
    console.log(state_id);
    /*var bulk = weatherstation.collection.initializeOrderedBulkOp();

    bulk.find({_id: id, state: req.body.state}).updateOne({
        $set: {
            status: req.body.status,
            age: req.body.age,
            ip_adr: req.body.ip_adr,
            coord: [{
                lng: req.body.coord[0].lng,
                lat: req.body.coord[0].lat
            }]
        }
    })

    bulk.find({_id: id, state: {$ne: req.body.state}}).updateOne({
        $push: {state: req.body.state}
    })

    bulk.execute(function (err, result) {
        // deal with result here
        res.json(result);
    });*/
    weatherstation.findOneAndUpdate({_id: id},
        {
            $set: {
                status: req.body.status,
                age: req.body.age,
                ip_adr: req.body.ip_adr,
                coord: [{
                    lng: req.body.coord[0].lng,
                    lat: req.body.coord[0].lat
                }],
                state:{ _id:req.body.state._id}
            }
        },
        {'new': true})
        .populate('state')
        .exec(function (err, updatedWS) {
            if (err)
                res.json(err);
            if (!updatedWS) {
                console.log('test')
                weatherstation.findOneAndUpdate(
                    {_id: id},
                    {$push: {state: {_id: state_id}}},
                    {'new': true})
                    .populate('state')
                    .exec(function (err, doc) {
                            //doc.state[0]._id.push(req.params.state._id);
                            res.json(doc)
                        }
                    );
            }
            else {
                res.json(updatedWS);
            }
        });

});

module.exports = router;
