const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
    name :{
        type : 'String',
        required: true
    },
    email : {
        type : 'String',
        required : true,
        unique : true
    },
    password : {
        type : 'String',
        required : true
    },
    isAdmin : {
        type : 'Boolean',
        required : true
    }
}, 
{
    timestamps : true
}
);
UserSchema.pre('save', function (next) {
    const user = this;

    // Check if the password is modified or if it's a new user
    if (!user.isModified('password')) return next();

    // Generate a salt (usually 10 rounds)
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        // Hash the password with the generated salt
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            // Replace the plain password with the hashed one
            user.password = hash;
            next();
        });
    });
});

const User = mongoose.model('User' , UserSchema);
module.exports = User;