//passport config and jwt claims options

var passport = require("passport");
var passportJWT = require("passport-jwt");
var User = require('../models/userSchema');
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'thisISvERYsECRET';
var jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
    console.log('payload received jwtconfig', payload);
    User.findById(payload._id, function(err, user){

        if(err){
            return done(err, false);
        }

        if(user){
            done(null, user);

        } else {
            done(null, false);
        }

    });

});
passport.use(jwtLogin);
module.exports={passport,jwtOptions};
