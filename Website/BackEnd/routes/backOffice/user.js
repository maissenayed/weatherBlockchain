var User=require('../../models/userSchema');
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    User.find(function (err,users) {
        if(err) {
            res.send(err);
            console.log('err');
        }
        if(!users) {
            res.status(404).send();
            console.log('users');
        }
        else {
            res.json(users);
            console.log(users);
        }
    });
});

module.exports = router;
