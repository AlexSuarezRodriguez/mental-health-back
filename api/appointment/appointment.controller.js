/* eslint-disable no-underscore-dangle */
const {
  getAllAppointment,
  getOneAppointment,
  createAppointment,
  deleteAppointment,
  updateAppointment,
  getAppointmentByPatientId,
} = require('./appointment.service');

async function handlerAllAppointment(req, res) {
  const appointments = await getAllAppointment();
  res.status(200).json(appointments);
}

async function handlerOneAppointment(req, res) {
  const { id } = req.params;
  try {
    const appointment = await getOneAppointment(id);
    res.status(200).json(appointment);
  } catch (error) {
    res.status(404).json({ message: 'error' });
  }
}
async function handlerAppointmentByPatientId(req, res) {
  const { id } = req.params;
  try {
    const appointment = await getAppointmentByPatientId(id);
    res.status(200).json(appointment);
  } catch (error) {
    res.status(404).json({ message: 'error' });
  }
}

async function handlerCreateAppointment(req, res) {
  const newAppointment = {
    ...req.body,
    patientId: req.user._id,
    doctorId: req.body.doctorId,
  };
  try {
    const appointment = await createAppointment(newAppointment);
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'error' });
  }
}

async function handlerDeleteAppointment(req, res) {
  const { id } = req.params;
  const appointment = await deleteAppointment(id);

  if (!appointment) {
    res.status(404).json({ message: `service not found with id: ${id}` });
  } else {
    res.status(200).json(appointment);
  }
}

async function handlerUpdateAppointment(req, res) {
  const { id } = req.params;
  const { body } = req.body;
  const updatedAppointment = await updateAppointment(id, body);

  if (!updatedAppointment) {
    res.status(404).json({ message: 'El usuario no existe' });
  } else {
    res.status(200).json(updatedAppointment);
  }
}

module.exports = {
  handlerAllAppointment,
  handlerOneAppointment,
  handlerCreateAppointment,
  handlerDeleteAppointment,
  handlerUpdateAppointment,
  handlerAppointmentByPatientId,
};
