const {
  getAllChistory,
  getOneChistory,
  createChistory,
  upadateChistory,
  deleteChistory
} = require ('./clinicHistory.service');

async function handlerAllClinicHistory (re, res){
    const clinicHistory = await getAllChistory();
    res.json(clinicHistory)
}

async function handlerOneClinicHistory(req, res) {
    const id = req.params.id;
    const clinicHistory = await getOneChistory(id);
  
    if (!clinicHistory) {
      res.status(404).json({ message: `Task not found with id: ${id}` });
    } else {
      res.json(clinicHistory);
    }
}

async function handlerCreateChistory (req, res){
    const newclinicHistory ={...req.body}
    const clinicHistory = await createChistory(newclinicHistory);
    if (!clinicHistory) {
        res.status(404).json({ message: `Clinic history not create` });
      } else {
        res.status(201).json(clinicHistory);
      }
}

async function handlerUpdateChistory (req, res){
    const { id } = req.params;
    const { body } = req;
    const clinicHistory = await upadateChistory (id, body);
    if(!clinicHistory){
      res.status(404).json({message: `the clinic history doesnt exist`});      
    }else {
      res.json(clinicHistory)
    }

}

async function handlerDeleteChistory (req, res){
  const id = req.params.id;
  await deleteChistory(id)
  res.status(204).send({});
}



module.exports={
    handlerAllClinicHistory,
    handlerOneClinicHistory,
    handlerCreateChistory,
    handlerUpdateChistory,
    handlerDeleteChistory    
}