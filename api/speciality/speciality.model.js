const { Schema, model } = require("mongoose");

const SpecialitySchema = Schema({
  name: {
    type: String
  },
},
{
  timestamps: true,
  versionKey: false,
});

module.exports = model('Speciality', SpecialitySchema);
