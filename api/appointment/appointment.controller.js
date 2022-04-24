/* eslint-disable no-underscore-dangle */
const {
  getAllAppointment,
  getOneAppointment,
  createAppointment,
  deleteAppointment,
  updateAppointment,
  getAppointmentByPatientId,
} = require('./appointment.service');

const { getUserById } = require('../user/user.service');
const { sendMail } = require('../../utils/emails');

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
    const patient = await getUserById(newAppointment.patientId);
    const doctor = await getUserById(newAppointment.doctorId);
    const appointment = await createAppointment(newAppointment);

    const startSplitted = appointment.start.split('T');
    const endSplitted = appointment.end.split('T');
    const startDate = startSplitted[0].split('-');
    const finalDate = [];
    for (let i = 2; i >= 0; i -= 1) {
      finalDate.push(startDate[i]);
    }
    const dataprue = finalDate.join('/');
    const startTime = startSplitted[1];
    const endTime = endSplitted[1];
    const emailPatient = {
      from: '"Equipo Mental Health" <ingdiegocubidestrane@gmail.com>',
      to: patient.email,
      subject: 'Confirmación cita Mental Health',
      template_id: 'd-ec2ab30c0fa64c358b4efd27f56a79a8',
      dynamic_template_data: {
        patient: `${patient.firstName} ${patient.lastName}`,
        doctor: `${doctor.firstName} ${doctor.lastName}`,
        dateStart: dataprue,
        startHour: startTime,
        endHour: endTime,
        link: 'https://meet.google.com/pub-purf-rqu?pli=1&authuser=0',
      },
    };
    const emailDoctor = {
      from: '"Equipo Mental Health" <ingdiegocubidestrane@gmail.com>',
      to: doctor.email,
      subject: 'Sesion cita Mental Health',
      template_id: 'd-37788759d00d47b5b59ce6e927e36a9e',
      dynamic_template_data: {
        patient: `${patient.firstName} ${patient.lastName}`,
        doctor: `${doctor.firstName} ${doctor.lastName}`,
        dateStart: dataprue,
        startHour: startTime,
        endHour: endTime,
        link: 'https://meet.google.com/pub-purf-rqu?pli=1&authuser=0',
      },
    };
    await sendMail(emailPatient);
    await sendMail(emailDoctor);
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
