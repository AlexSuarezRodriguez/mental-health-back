const mongoose = require ('mongoose');
const clinicHistory = new mongoose.Schema({
    description: {type: String, required: true, unique:true},
    userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      required: false,
    },
    doctorId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      required: false,
    },
},
  
{
    timestamps: true,
    versionKey: false,
  })

module.exports = mongoose.model('clinicHistory', clinicHistory);