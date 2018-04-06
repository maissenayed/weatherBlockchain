var state = require('./../../models/stateSchema');
var express = require('express');
var router = express.Router();

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
