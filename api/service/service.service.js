const ServiceModel = require('./service.model')

function getAllService() {
  return ServiceModel.find();
}

async function getOneService(_id) {
  const service = await ServiceModel.find({userId:{_id}}).
  populate({path:'userId', select: 'firstName lastName'})

  if (!service) {
    return null;
  }

  return service;
}

async function createService(service) {
  const newService = await new ServiceModel(service);
  return newService.save();
}

async function deleteService(id){
const service = await  ServiceModel.findByIdAndDelete(id)

  if(!service){
    return null;
  }
  return service;
}

async function updateService(id, service) {
  const updatedService = await ServiceModel.findByIdAndUpdate(id, service);
  return updatedService;
}

module.exports = {
  getAllService,
  getOneService,
  createService,
  deleteService,
  updateService
}