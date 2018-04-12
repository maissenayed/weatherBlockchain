var User = require('../../models/userSchema');
var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
/* GET home page. */
router.get('/', function (req, res, next) {
    User.find(function (err, users) {
        if (err) {
            res.send(err);
            console.log('err');
        }
        if (!users) {
            res.status(404).send();
            console.log('users');
        }
        else {
            res.json(users);
            console.log(users);
        }
    });
});
router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    User.findById(id).exec(function (err, userFound) {
        if (err) {
            return res.send(err);
        }
        if (!userFound) {
            return res.sendStatus(404);
        }
        else {
            return res.json(userFound);
        }
    });
});
router.post('/', function (req, res) {
    var usr = new User(req.body);
    usr.save(function (err, newUser) {
        if (err)
            res.send(err);
        else
            res.send(newUser);
    });
});
router.delete('/:id', function (req, res) {

    var id = req.params.id;
    User.findByIdAndRemove({_id: id}, function (err, userFound) {
        if (err)
            res.send(err);
        else
            res.send(202);
    });

});
router.put('/:id/:TBorAED?', function (req, res) {
    if (!req.params.TBorAED) {
        var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
        var password = bcrypt.hashSync(req.body.password, salt);


        User.findOneAndUpdate({_id: req.params.id},
            {
                $set: {
                    wallet_adr: req.body.wallet_adr,
                    token_balance: req.body.token_balance,
                    apiExpirationDate: req.body.apiExpirationDate,
                    apiKey: req.body.apiKey,
                    username: req.body.username,
                    password: password,
                    role: req.body.role
                }
            }, function (err, updatedUser) {
                if (err)
                    res.json(err);
                else {
                    res.json(updatedUser);
                }
            });
    }
    else if (req.params.TBorAED === "TB"){
        User.findOneAndUpdate({_id: req.params.id},
            {
                $set: {
                    token_balance: req.body.token_balance
                }
            }, function (err, updatedUser) {
                if (err)
                    res.json(err);
                else {
                    res.json(updatedUser);
                }
            });
    }
    else if (req.params.TBorAED ==="AEDANDTB"){
        User.findOneAndUpdate({_id: req.params.id},
            {
                $set: {
                    apiExpirationDate: req.body.apiExpirationDate,
                    token_balance: req.body.token_balance
                }
            }, function (err, updatedUser) {
                if (err)
                    res.json(err);
                else {
                    res.json(updatedUser);
                }
            });
    }
    else{
        User.findOneAndUpdate({_id: req.params.id},
            {
                $set: {
                    apiExpirationDate: req.body.apiExpirationDate
                }
            }, function (err, updatedUser) {
                if (err)
                    res.json(err);
                else {
                    res.json(updatedUser);
                }
            });
    }
});
module.exports = router;
