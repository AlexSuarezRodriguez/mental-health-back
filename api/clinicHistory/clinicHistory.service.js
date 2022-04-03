const clinicHistoryModel = require ('./clinicHistory.model');

async function getAllChistory (){
    const clinicHistory = await clinicHistoryModel.find();
    return (clinicHistory)
}

async function getOneChistory (id){
    const clinicHistory = await clinicHistoryModel.findById(id);
    populate({path:'userId', select: 'firstName lastName'})
    return (clinicHistory)
}

async function createChistory (clinicHistory){
    const newclinicHistory = await clinicHistoryModel.create(clinicHistory);
    return (newclinicHistory)
}

async function upadateChistory (id, clinicH){
    const cHistoryUpdated = await clinicHistoryModel.findByIdAndUpdate(id, clinicH, {new:true} )
    return (cHistoryUpdated)
}

async function deleteChistory (id){
    const cHistoryDeleted = await clinicHistoryModel.findByIdAndDelete(id)
    return (cHistoryDeleted)
}

module.exports = {
    getAllChistory,
    getOneChistory,
    createChistory,
    upadateChistory,
    deleteChistory    
}