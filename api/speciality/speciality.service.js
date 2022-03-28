const SpecialityModel = require('./speciality.model');

async function getAllSpeciality() {
  const specialities = await SpecialityModel.find();
  return specialities;
}

async function getOneSpeciality(id) {
  const speciality = await SpecialityModel.findById(id);
  if (!speciality){
    return null;
  } else {
    return speciality;
  }
}

async function createSpeciality(speciality) {
  const { name } = speciality;
  const existName = await SpecialityModel.findOne({ name });
  if (existName) {
    return null;
  }
  const newSpeciality = await SpecialityModel .create(speciality);
  return newSpeciality;
}

async function updateSpeciality(id, speciality) {
  const updateSpeciality = await SpecialityModel.findByIdAndUpdate(id, speciality);
  return updateSpeciality;
}

async function deleteSpeciality(id) {
  const speciality = await SpecialityModel.findByIdAndDelete(id);
  if (!speciality){
    return null;
  } else {
    return speciality;
  }
}

module.exports = {
  getAllSpeciality,
  getOneSpeciality,
  createSpeciality,
  updateSpeciality,
  deleteSpeciality,
}
