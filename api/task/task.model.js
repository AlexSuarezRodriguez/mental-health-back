const mongoose = require ('mongoose');
const taskSchema = new mongoose.Schema({
    title:{type: String, required: true},
    status: {type: Boolean, default: true},
},
{
    timestamps: true,
    versionKey: false,
  })

module.exports = mongoose.model('task', taskSchema);