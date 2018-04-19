var express = require('express');
var router = express.Router();
var request = require('request');
var configuration=require('./../models/configurationSchema');

/* GET home page. */
router.get('/:plan',  (req, res, next)=> {
    let plans = req.params.plan +"_usd";
    getPriceNow((price)=>{

        getPriceDB( plans ,(data)=>{
            res.setHeader('Content-Type', 'application/json');
            //res.send(data);
            res.send('{ "'+ req.params.plan +'" : '+((1/ price) * data[0].value) +" }");
        });
    });

});

router.get('/',  (req, res, next)=> {

    getPriceNow((price)=>{

        getPriceDB( "ticket_price" ,(data)=>{
            let notif = {
                notification : false
            };

            if(price - (10/data[0].value ) > 2){
                console.log(price  + "   "+( 10 /data[0].value));
                notif.notification = true ;
            }
            res.json(notif);
        });
    });

});

router.post('/:plan',  (req, res, next)=> {
    configuration.findOneAndUpdate({name: req.params.plan}, {$set:{value:req.body.newprice}}, {new: true}, function(err, pl){
        if(err){
            res.send("Something wrong when updating data!");
        }

        res.send(pl);
    });
});

function getPriceDB(plans,callback) {

    configuration.find({name:plans}, (err,conf) => {
        if(err) {
            //res.send(err);
            console.log('err');
            callback(0);
        }
        if(!conf) {
            //res.status(404).send();
            console.log("!conf");
            callback(0);

        }
        else {
            // res.json(conf);
            console.log(conf)
            callback(conf);
            //console.log(conf);
        }
    })
}

function getPriceNow(callback){
    request.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=ETH,USD,EUR',(error, response, body) =>{
        if (!error && response.statusCode == 200) {
            priceNow = JSON.parse(body).USD ;
            callback(priceNow);
        } else {
            console.log(error)
            callback("error");

        }
    });
}

module.exports = router;
