const {
  getAllService,
  getOneService,
  createService,
  deleteService,
  updateService
} = require('./service.service')

async function handlerAllService(req, res) {
  const services = await getAllService();
  res.json(services);
}

async function handlerOneService(req, res) {
  const { title } = req.body;
  const service = await getOneService(title);

  res.status(201).json(service);
}

async function handlerCreateService(req, res) {
  const service = await createService(req.body);
  res.json(service);
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