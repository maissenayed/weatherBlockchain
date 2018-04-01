var transaction=require('../models/transactionSchema');
var User=require('../models/userSchema');
//transactions by user
exports.UserTransaction = function(req, res, next){
        let user = req.user;
        console.log(user);
        User.findById(user._id, function(err, foundUser){
            if(err){
                res.status(422).json({error: 'No user found.'});
                return next(err);
            }
            transaction.find({sender_adr:foundUser.wallet_adr}).exec(function (err,transaction) {
                if(err){
                    res.send(err);
                }
                if(!transaction){
                    res.sendStatus(404);
                }
                else {
                    res.json(transaction);
                }
            });
        });
    }




