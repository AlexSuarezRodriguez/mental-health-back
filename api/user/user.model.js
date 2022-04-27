const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
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
    avatar: {
      type: String,
      default: 'https://res.cloudinary.com/mentalhealth/image/upload/v1650642132/perfilgenerico_h7dtjm.png',
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
    payment: {
      customerId: String,
      cards: [
        {
          paymentMethodId: String,
          brand: String,
          country: String,
          exp_month: Number,
          exp_year: Number,
          funding: String,
          last4: String,
        },
      ],
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
