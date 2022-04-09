const appointmentModel = require("./appointment.model");

function getAllAppointment() {
  return appointmentModel.find();
}

async function getOneAppointment(_id) {
  const appointment = await appointmentModel
    .find({ doctorId: { _id } })
    .populate({ path: "doctorId", select: "firstName lastName" })
    .populate({ path: "patientId", select: "firstName lastName" });

  if (!appointment) {
    return null;
  }
  return appointment;
}

async function createAppointment(service) {
  const newAppointment = await new appointmentModel(service);
  return newAppointment.save();
}

async function deleteAppointment(id) {
  const appointment = await appointmentModel.findByIdAndDelete(id);

  if (!appointment) {
    return null;
  }
  return appointment;
}

async function updateAppointment(id, appointment) {
  const updatedAppointment = await appointmentModel.findByIdAndUpdate(
    id,
    appointment
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
