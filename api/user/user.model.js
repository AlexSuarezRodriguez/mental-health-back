const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema ({
  firstName : {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  lastName : {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phone : {
    type: String,
    trim: true,
  },
  email : {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  avatar: {
    type: String,
  },
  password: {
    type: String,
    select: false,
  },
},
{
  timestamps: true,
  versionKey: false,
}
)

module.exports = mongoose.model('User', UserSchema);