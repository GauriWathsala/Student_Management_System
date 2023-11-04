
const nodemailer = require('nodemailer');

const sendEmail = (subject, toEmail, emailBody) => {
try {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Corrected host value
    port: 465,
    secure: true, // for secure connections
    auth: {
      user: 'gifted.education.ielts@gmail.com', // Gmail email address
      pass: 'ujwxdrkvsztpxaoe', // Gmail app-specific password
    },
  });

  let message = {
    from: 'gifted.education.ielts@gmail.com',
    to: toEmail,
    subject: subject,
    text: emailBody,
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
} catch (error) {
  console.error('Error sending email:', error);
}
};

module.exports = { sendEmail };


