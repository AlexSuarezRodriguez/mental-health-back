const  mongoose  = require('mongoose');

const ServiceSchema= new mongoose.Schema({
  title: {
    type:String,
    required:true,
    trim: true,
    uppercase: true,
    unique: true
  },
  description:{
    type:String,
    required:true,
    trim: true,
    lowercase: true,
    unique: true
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true,
  }
},{
  timestamps:true,
  versionKey:false
})
module.exports = mongoose.model('Service',ServiceSchema);