const mongoose = require ('mongoose');
const appoimentSchema = new mongoose.Schema({
    stardate:{type: Number, required: true},
    enddate: {type: Number, default: true},
    idpatient:{type: Number, required: true},
    iddoctor:{type: Number, required: true},
    price:{type: Number, required: true}
},
{
    timestamps: true,
    versionKey: false,
  })

module.exports = mongoose.model('appoiment', appoimentSchema);