var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


var UserSchema = mongoose.Schema({
    first_name: {type: String},
    last_name: {type: String},
    username:{type: String, index: true},
    password:{type: String},
    email:{type: String},
    date_of_birth:{type: Date},
    image:{type: String},
});

var User = module.exports = mongoose.model('User', UserSchema);

UserSchema.virtual('imageUrl').get(function(){
    return  '/image/' + this.image;
});

module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.password, salt, function(err, hash){
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    User.findOne(query, callback);
};

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch){
        if(err) throw err;
        callback(null, isMatch);
    });

};