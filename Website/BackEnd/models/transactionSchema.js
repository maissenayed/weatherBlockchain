var mongoose = require('mongoose');
var Schema =mongoose.Schema;
const TransactionSchema= new Schema({
    sender_adr:String,
    contract_adr:String,
    selected_package:String,
    transaction_date:Date,
    purchase_amount:Number,
    price:{
        ticket_price:String,
        week_price:String,
        month_price:String
    }
});
module.exports =mongoose.model('transaction',TransactionSchema);