const  mongoose  = require('mongoose');

const ServiceSchema= new mongoose.Schema({
  start: {
    type:String,
    required:true,
    trim: true,
    unique: true
  },
  end:{
    type:String,
    required:true,
    trim: true,
    unique: true
  },
  patientId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true,
  },
  doctorId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true,
  }
},{
  timestamps:true,
  versionKey:false
})
module.exports = mongoose.model('Appointment',ServiceSchema);