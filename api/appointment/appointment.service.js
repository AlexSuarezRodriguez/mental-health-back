/* eslint-disable no-unused-vars */
const AppointmentModel = require('./appointment.model');

function getAllAppointment() {
  return AppointmentModel.find();
}

async function getOneAppointment(_id) {
  const appointment = await AppointmentModel
    .find({ doctorId: { _id } })
    .populate({ path: 'doctorId', select: 'firstName lastName' })
    .populate({ path: 'patientId', select: 'firstName lastName' });

  if (!appointment) {
    return null;
  }
  return appointment;
}
async function getAppointmentByPatientId(_id) {
  const appointment = await AppointmentModel
    .find({ patientId: { _id } })
    .populate({ path: 'doctorId', select: '_id' })
    .populate({ path: 'patientId', select: '_id' });

  if (!appointment) {
    return null;
  }
  return appointment;
}

async function createAppointment(appointment) {
  const newAppointment = await new AppointmentModel(appointment);
  return newAppointment.save();
}

async function deleteAppointment(_id) {
  const appointment = await AppointmentModel.findByIdAndDelete(_id);

  if (!appointment) {
    return null;
  }
  return appointment;
}
async function updateAppointment(id, appointment) {
  const updatedAppointment = await AppointmentModel.findByIdAndUpdate(
    id,
    appointment,
    { new: true },
  );
  return updatedAppointment;
}

module.exports = {
  getAllAppointment,
  getOneAppointment,
  createAppointment,
  deleteAppointment,
  updateAppointment,
  getAppointmentByPatientId,
};
