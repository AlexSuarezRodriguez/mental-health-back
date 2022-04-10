const sgMail = require('@sendgrid/mail');

async function sendMail(data) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  return sgMail.send(data);
}

module.exports = { sendMail };
