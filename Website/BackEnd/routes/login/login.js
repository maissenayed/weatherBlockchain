var express = require('express');
//var passportoption = require("./../../libs/auth");
var auth = require("./../../libs/authentication");
passport = require('passport');
var _ = require("lodash");
var User = require('../../models/userSchema');
var ethUtil = require('ethereumjs-util');
var router = express.Router();
router.post("/login", auth.login);
router.post('/sign',auth.MetaSign);
router.post('/register',auth.registerUser);
/*router.post('/registerU',function(){
    console.log("wazzap")
});*/

router.get('/user',function(req, res) {
    console.log(req.body);
    var user = new User({

        role: "client",

    });
    res.json(user);

});
router.get('/refresh',function(req, res, next) {
    console.log(req.body);
    var user = new User({
        username: username,
        password: password,
        wallet_adr: address,
        role: "client",

    });
    res.json(user);

});
module.exports=router;