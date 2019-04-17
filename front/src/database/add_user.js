var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/gp');

var model = new mongoose.Schema({
    username: String,
    password: String
});

exports.userSchema = model
exports.userModel = mongoose.model('User', model);

exports.add_user = function (userName, passWord, user) {
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("Connected to DB");
        var userSchema = new mongoose.Schema({
            username: String,
            password: String
        });
        var User = mongoose.model('User', userSchema);
        var user = new User({username: userName, password: passWord})
        user.save(function (err, user) {
            if (err) return console.error(err);
            console.log(user)
        });
    });
}
