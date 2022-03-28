const {
  getAllSpeciality,
  getOneSpeciality,
  createSpeciality,
  updateSpeciality,
  deleteSpeciality,
} = require('./speciality.service');

async function handlerAllSpeciality(req, res) {
  const specialities = await getAllSpeciality();
  res.json(specialities);
}

async function handlerOneSpeciality(req, res){
  const { id } = req.params;
  const speciality = await getOneSpeciality(id);
  if (!speciality) {
    res.status(404).json({message: `Speciality not found with id: ${id}`});
  } else {
    res.json(speciality);
  }
}

async function handlerCreateSpeciality(req, res) {
  const body = req.body;
  try {
    const newSpeciality = await createSpeciality(body);
    if (!newSpeciality) {
      res.status(400).json({ message: `${body.name} is already registered`});
    } else {
      res.status(201).json(newSpeciality);
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

async function handlerUpdateSpeciality(req, res) {
  const { id } = req.params;
  const { body } = req;
  const updatedSpeciality = await updateSpeciality(id, body);
  if (!updatedSpeciality) {
    res.status(404).json({message: `Speciality not found with id: ${id}`});
  } else {
    res.json(updatedSpeciality);
  }
}

async function handlerDeleteSpeciality(req, res) {
  const { id } = req.params;
  const speciality = await deleteSpeciality(id);
  if (!speciality) {
    res.status(404).json({message: `Speciality not found with id: ${id}`});
  } else {
    res.json(speciality);
  }
}

module.exports = {
  handlerAllSpeciality,
  handlerOneSpeciality,
  handlerCreateSpeciality,
  handlerUpdateSpeciality,
  handlerDeleteSpeciality,
};
