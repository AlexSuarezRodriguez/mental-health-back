const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    required: true,
  },
  role: {
    type: String,
    default: 'patient',
    enum: ['doctor', 'admin', 'patient'],
    required: true,
  },
  specialty: {
    type: String,
  },
  google: {
    type: Boolean,
    default: false,
  },
  facebook: {
    type: Boolean,
    default: false,
  },
  licencia: {
    type: String,
  },
  university_diploma: {
    type: String,
  },
  specialization_diploma: {
    type: String,
  },
},
{
  timestamps: true,
  versionKey: false,
}
)

UserSchema.pre('save', async function (next){
  const user = this;
  try {
    if (!user.isModified('password')){
      next();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    return next();
    }
    catch(error){
      next();
  }
});

UserSchema.methods.comparePassword = async function(candidatePassword){
  const user = this;
  const result = await bcrypt.compare(candidatePassword, user.password);
  return result;
};

UserSchema.virtual('profile').get(function(){
  const {firstName, lastName,email,role}=this;

  return{
    fullName:`${firstName} ${lastName}`,
    email,
    role
  };
});

module.exports = mongoose.model('User', UserSchema);