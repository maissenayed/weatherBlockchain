var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var UserSchema=mongoose.Schema({
    //trim :true means no spaces
    wallet_adr:{type:String,required:true,trim:true,unique:true},
    token_balance:{type:Number,required:true,default:0},
    apiExpirationDate: {type:Date,default:new Date()},
    apiKey:String,
    username:{type:String, index: { unique: true }},
    password:{type:String,required:true},
    role: {
        type: String,
        enum: ['admin', 'client'],
        default: 'client'
    }
});
// referenced website : https://stackoverflow.com/questions/14588032/mongoose-password-hashing
UserSchema.pre('save', function (next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
    this.password = bcrypt.hashSync(this.password, salt);

    this.username = this.get('wallet_adr');
    next()
});
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
module.exports =mongoose.model('User',UserSchema);