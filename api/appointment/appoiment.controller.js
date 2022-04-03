const {
    getAllAppoiments,
    getOneAppoiments,
    createAppoiments,
    upadateAppoiments,
    deleteAppoiments
  } = require ('./appoiment.service');
  
  async function handlerAllAppoiments (re, res){
      const Appoiment = await getAllAppoiments();
      res.json(Appoiment)
  }
  
  async function handlerOneAppoiments(req, res) {
      const id = req.params.id;
      const Appoiment = await getOneAppoiments(id);
    
      if (!Appoiment) {
        res.status(404).json({ message: `Task not found with id: ${id}` });
      } else {
        res.json(Appoiment);
      }
  }
  
  async function handlerCreateAppoiment (req, res){
      const newAppoiment ={...req.body, userId:req.user._id} 
      const Appoiment = newAppoiment && await createAppoiments(newAppoiment);
      if (!Appoiment) {
          res.status(404).json({ message: `appoiment not create` });
        } else {
          res.json(Appoiment);
        }
  }
  
  async function handlerUpdateAppoiments (req, res){
      const { id } = req.params;
      const { body } = req;
      const newAppoiment = await upadateAppoiments (id, body);
      if(!newAppoiment){
        res.status(404).json({message: `the appoiment doesnt exist`});      
      }else {
        res.json(newAppoiment)
      }
  
  }
  
  async function handlerDeleteAppoiments (req, res){
    const id = req.params.id;
    await deleteAppoiments(id)
    res.status(204).send({});
  }
  
  
  
  module.exports={
    handlerAllAppoiments,
    handlerOneAppoiments,
    handlerCreateAppoiment,
    handlerUpdateAppoiments,
    handlerDeleteAppoiments    
  }