const mongoose = require ('mongoose');
const appoiment = new mongoose.Schema({
    stardate:{type: String, required: true},
    enddate: {type: String, required: true},
    doctorId:{type: String, default: false},

    userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      required: true,
  },
},
{
    timestamps: true,
    versionKey: false,
  })

module.exports = mongoose.model('appoiment', appoiment);