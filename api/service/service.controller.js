const {
  getAllService,
  getOneService,
  createService,
  deleteService,
  updateService
} = require('./service.service')

async function handlerAllService(req, res) {
  const services = await getAllService();
  res.status(200).json(services);
}

async function handlerOneService(req, res) {
  const {id} = req.params;
  try{
    const service = await getOneService(id);
  
    res.status(200).json(service);
  }catch{
    res.status(404).json({message:'error'})
  }
}

async function handlerCreateService(req, res) {

  const newService={
    ...req.body,
    userId:req.user._id
  }
  try{
    const service=await createService(newService) 
    res.json(service);
  }catch{
    res.status(500).json(error)
  }
}

async function handlerDeleteService(req, res){
  const id = req.params.id;
  const service = await deleteService(id);

  if (!service) {
    res.status(404).json({ message: `service not found with id: ${id}` });
  } else {
    res.json(service);
  }
}

async function handlerUpdateService(req, res) {
  const { id } = req.params;
  const { body } = req;
  const updatedService = await updateService(id, body);
  
  if (!updatedService) {
    res.status(404).json({message: `El usuario no existe`});
  } else {
    res.json(updatedService);
  }
}

module.exports = {
  handlerAllService,
  handlerOneService,
  handlerCreateService,
  handlerDeleteService,
  handlerUpdateService
}