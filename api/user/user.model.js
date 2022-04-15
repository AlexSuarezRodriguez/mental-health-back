const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    role: {
      type: String,
      default: 'patient',
      enum: ['doctor', 'admin', 'patient'],
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: false,
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
    description: {
      type: String,
<<<<<<< HEAD
      required: true,
=======
>>>>>>> develop
      trim: true,
      lowercase: true,
    },
    atentionarea: {
      type: String,
      trim: true,
      lowercase: true,
    },
    experience: {
      type: String,
      trim: true,
      lowercase: true,
    },
    academic: {
      type: String,
      trim: true,
      lowercase: true,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

UserSchema.pre('save', async function (next) {
  const user = this;
  try {
    if (!user.isModified('password')) {
      next();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    return next();
  } catch (error) {
    next();
    return null;
  }
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const user = this;
  const result = await bcrypt.compare(candidatePassword, user.password);
  return result;
};

UserSchema.virtual('profile').get(function () {
  const {
    firstName, lastName, email, role, _id,
  } = this;

  return {
    fullName: `${firstName} ${lastName}`,
    email,
    role,
    _id,
  };
});

module.exports = mongoose.model('User', UserSchema);
