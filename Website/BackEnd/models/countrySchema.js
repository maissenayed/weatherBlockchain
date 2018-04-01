var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const countrySchema =new Schema({
    name:String,
    isoCode:String,
    hmapCode:String,
    continent:{
        name:String,
        hmapCode:String
    }
});
module.exports =mongoose.model('Country',countrySchema);