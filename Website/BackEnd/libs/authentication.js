var jwt = require('jsonwebtoken');
var User = require('../models/userSchema');
var authConfig = require('./jwtConfig');

// set jwt user info
function setUserInfo(request){
    return {
        _id: request._id,
        username: request.username,
        role: request.role
    };
}
//random uiid function for api key
exports.uuid=function generateUUID() {
    var d = new Date().getTime();

    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c)
    {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });

    return uuid;
   }
   /*login function*/
exports.login = function(req, res, next){

    if(req.body.name && req.body.password){
        var username = req.body.name;
        var password = req.body.password;
    }
    // usually this would be a database call:
     User.findOne({username: new RegExp('^'+username+'$', "i")}, function(err, user) {
        if(err){
            res.send(err);
        }
        if(!user){
            res.sendStatus(404);
        }else {
            user.comparePassword(password, function(err, isMatch) {
                console.log("isMatch", isMatch);
                if (err) next(err);

                if (!isMatch) {
                    res.status(401).json({message:"passwords did not match"});
                }
            });
            if(user.apiExpirationDate !==  new Date().getTime()){
                return res.status(422).send({error: 'Your API validation has expired'});
            }
            let userInfo = setUserInfo(user);
            let token = jwt.sign(userInfo,authConfig.jwtOptions.secretOrKey,{ expiresIn: 10080});
            res.json({message: "ok", token: token,userInfo:userInfo});
        }
    });
    /*var userInfo = setUserInfo(req.user);

    res.status(200).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
    });*/

}
//register function
exports.register = function(req, res, next){

    var username = req.body.username;
    var password = req.body.password;
    var address = req.body.address;

    if(!username){
        return res.status(422).send({error: 'You must enter an UserName bech'});
    }

    if(!password){
        return res.status(422).send({error: 'You must enter a password'});
    }

    User.findOne({userName: email}, function(err, existingUser){

        if(err){
            return next(err);
        }

        if(existingUser){
            return res.status(422).send({error: 'That UserName is already in use'});
        }

        var user = new User({
            username: username,
            password: password,
            wallet_adr: address,
            role: "client",
            apiKey: uuid()
        });

        user.save(function(err, user){

            if(err){
                return next(err);
            }

            let userInfo = setUserInfo(user);
            let token = jwt.sign(userInfo,authConfig.jwtOptions.secretOrKey, {expiresIn: 10080});
            res.json({message: "ok", token: token,userInfo:userInfo});

        });

    });

}
//role authorisation for jwt
exports.roleAuthorization = function(roles){

    return function(req, res, next){
        let user = req.user;
       console.log(user);
        User.findById(user._id, function(err, foundUser){

            if(err){
                res.status(422).json({error: 'No user found.'});
                return next(err);
            }

            if(roles.indexOf(foundUser.role) > -1){
                return next();
            }else {

                res.status(401).json({error: 'You are not authorized to view this content'});

            }

        });

    }

}
//login with meta mask
exports.MetaSign = function(req, res){
    var owner_adr  =req.body.address;
    var sig  =req.body.signature;
    console.log('owner_adr: '+ owner_adr)
    console.log('signature: '+ sig)

    var data = '270bytes weather';
    var message = ethUtil.toBuffer(data);
    var msgHash = ethUtil.hashPersonalMessage(message);
    // Get the address of whoever signed this message
    var signature = ethUtil.toBuffer(sig);

    var sigParams = ethUtil.fromRpcSig(signature);
    var publicKey = ethUtil.ecrecover(msgHash, sigParams.v, sigParams.r, sigParams.s);
    var sender = ethUtil.publicToAddress(publicKey);
    var addr = ethUtil.bufferToHex(sender);

    // Determine if it is the same address as 'owner'
    var match = false;
    if (addr == owner_adr) { match = true;

        // usually this would be a database call:
        User.findOne({wallet_adr: new RegExp('^'+owner_adr+'$', "i")}, function(err, user) {
            if(err){
                res.send(err);
            }
            if(!user){
                res.sendStatus(404);
            }else {

                let userInfo = setUserInfo(user);
                let token = jwt.sign(userInfo,authConfig.jwtOptions.secretOrKey,{ expiresIn: 10080});
                res.json({message: "ok", token: token,userInfo:userInfo});
            }
        });

    }









      }