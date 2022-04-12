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

async function createAppointment(appointment) {
  const newAppointment = await new AppointmentModel(appointment);
  return newAppointment.save();
}

async function deleteAppointment(id) {
  const appointment = await AppointmentModel.findByIdAndDelete(id);

  if (!appointment) {
    return null;
  }
  return appointment;
}

async function updateAppointment(id, appointment) {
  const updatedAppointment = await AppointmentModel.findByIdAndUpdate(
    id,
    appointment,
  );
  return updatedAppointment;
}

module.exports = {
  getAllAppointment,
  getOneAppointment,
  createAppointment,
  deleteAppointment,
  updateAppointment,
};
