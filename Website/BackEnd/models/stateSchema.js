var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Country =require('./../models/countrySchema');
var stateSchema = new Schema({
    "name": String,
    "highChartKey": String,
    "hc-a2": String,
    "country":[ {type: Schema.ObjectId, ref: 'Country'}]
});

module.exports = mongoose.model('State', stateSchema);