const mongoose = require ('mongoose');
const taskSchema = new mongoose.Schema({
    title:{type: String, required: true},
    status: {type: Boolean, default: true},
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

module.exports = mongoose.model('task', taskSchema);