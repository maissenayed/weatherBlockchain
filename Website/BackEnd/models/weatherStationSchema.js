var mongoose = require('mongoose');
var State =require('./../models/stateSchema');
var Schema = mongoose.Schema;
var WeatherStationSchema=new Schema({
    status:String,
    age:Number,
    ip_adr:String,
    coord:{
        lng:Number,
        lat:Number
    },
    state:[ {type: Schema.ObjectId, ref: 'State'}]
});
module.exports =mongoose.model('weather_station',WeatherStationSchema);