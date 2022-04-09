const sgMail = require('@sendgrid/mail');

async function sendMail(data) {
  sgMail.setApiKey('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');
  return sgMail.send(data);
}

module.exports = { sendMail };
