var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var WeatherDataSchema = new Schema({
    coord: {
        lng: Number,
        lat: Number,
        state_code: String,
        country_code: String
    },
    sys: {
        country: String,
        sunrise: String,
        sunset: String
    },
    main: {
        temp: Number,
        humidity: Number,
        pressure: Number
    },
    timestamp: Date,
    state: [{type: Schema.ObjectId, ref: 'State'}]
});
module.exports = mongoose.model('weather_data', WeatherDataSchema);