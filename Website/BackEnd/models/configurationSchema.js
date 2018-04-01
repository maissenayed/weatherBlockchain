var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const configurationSchema =new Schema({
    name:String,
    value:Number
});
module.exports =mongoose.model('Configuration',configurationSchema);