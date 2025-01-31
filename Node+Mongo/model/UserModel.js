const { required } = require("joi")
const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    salt: {
      type: String,
      required: true,
    },
    passwordhash: {
      type: String,
      required: true,
    },
  });

const UserModel = mongoose.model("user" , UserSchema);

module.exports = UserModel;