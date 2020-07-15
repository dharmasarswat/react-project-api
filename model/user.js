const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const UserSchema = mongoose.Schema({
    Id:{
        type: Number,
        unique: true
    },
    firstName:{
        type: String,
        require: true
    },
    lastName:{
        type: String,
        require: true
    },
    email:{
        type: String,
        unique: true,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    dateCreated:{
        type: Date,
        default: Date.now
    }
});

UserSchema.plugin(autoIncrement.plugin , { model: 'User', field: 'Id' });

const User = mongoose.model('User' , UserSchema);

module.exports = User;