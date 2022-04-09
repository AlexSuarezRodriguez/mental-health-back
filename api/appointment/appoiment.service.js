const appoimentModel = require ('./appoiment.model')

async function getAllAppoiments (){
    const Appoiment = await appoimentModel.find();
    return (Appoiment)
}

async function getOneAppoiments (id){
    const Appoiment = await appoimentModel.findById(id).populate({path:'userId', select: 'firstName lastName'})
    return (Appoiment)
}

async function createAppoiments (appoiment){
    const newAppoiment = await appoimentModel.create(appoiment);
    return (newAppoiment)
}

async function upadateAppoiments (id, appoiment){
    const appoimentUpdated = await appoimentModel.findByIdAndUpdate(id, appoiment, {new:true} )
    return (appoimentUpdated)
}

async function deleteAppoiments (id){
    const appoimentDeleted = await appoimentModel.findByIdAndDelete(id)
    return (appoimentDeleted)
}

module.exports = {
    getAllAppoiments,
    getOneAppoiments,
    createAppoiments,
    upadateAppoiments,
    deleteAppoiments   
}