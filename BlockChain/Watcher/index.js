var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://parity.nammumu.net:8545/'));
var request = require('request');
//var web3 = new Web3(new Web3.providers.HttpProvider("ropsten.infura.io/Aw3w60eim9JnLWZHH1gl"));

const abi = require("./SmartContract/ABI.json");
var nummumContract = web3.eth.contract(abi).at("0x48a9ca6e6cc7e5664ccc746213b3e3e6bf88e23d");
var myEvent = nummumContract.Sent({fromBlock: 'latest'});

var transactionmodel = {
    "price" : {
        "ticket_price" : 0.001,
        "week_price" : 0.007,
        "month_price" : 0.021
    },
    "sender_adr" : "",
    "contract_adr" : "",
    "selected_package" : "",
    "transaction_date" : new Date(),
    "purchase_amount" : 0
} ;
myEvent.watch((error, result) => {
    if (!error) {
        //console.log(result);
        console.log("------------------------");
        transactionmodel.sender_adr = result.args.from ;
        transactionmodel.contract_adr = result.address ;
        transactionmodel.selected_package = result.args.plan.toString() ;
        transactionmodel.transaction_date = new Date();
        transactionmodel.purchase_amount = parseFloat(web3.fromWei(result.args.amount.toString(), "ether"));
        transactionmodel.price.ticket_price = parseFloat(web3.fromWei(result.args.ticket.toString(), "ether"));
        transactionmodel.price.week_price = parseFloat(web3.fromWei(result.args.week.toString(), "ether"));
        transactionmodel.price.month_price = parseFloat(web3.fromWei(result.args.month.toString(), "ether"));
        console.log(transactionmodel);
        SaveTransaction(transactionmodel);
    }
    else {
        console.log(error)
    }
//console.log(result.args);
});


function SaveTransaction(alldata) {

    var options = {
        uri: 'http://apicollector.nammumu.net:3002/transaction',
        method: 'POST',
        json: alldata
    };

    request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // Print the shortened url.
        } else {
            console.log(error)
        }
    });
}