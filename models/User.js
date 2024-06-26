const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const { resolve } = require('path');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
            "Please provide valid email"
        ]
    },
    password:  {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6,
    }, 
    googleId: {
        required: false, 
        type: String
    }
});

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.getName = function () {
    return this.name
}

UserSchema.methods.getEmail = function () {
    return this.email
}



UserSchema.methods.createJWT = async function () {
    return new Promise((resolve, reject) => {
      jwt.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, { expiresIn: '30d' }, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  };
  

UserSchema.methods.comparePasswords = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}
module.exports = mongoose.model('User', UserSchema)
