/***************************************************************************

  Services     : nodemailer

  **************************************************
  Functions
  **************************************************
  sendMail
  **************************************************

***************************************************************************/

let nodemailer = require('nodemailer');
const envVariables = require('../utils/constants/envVariables');

module.exports = {
  /* sendMail() */
  sendMail: async (email, otp, reason) => {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      auth: {
        user: envVariables.USER_NAME,
        pass: envVariables.PASS,
      },
    });

    let mailOptions;

    if (email && otp) {
      mailOptions = {
        from: envVariables.USER_NAME,
        to: email,
        subject: 'OTP for new Password',
        html:
          '<h3>Please use on given otp to reset your password </h3>' +
          `<h1 style='font-weight:bold;'>` +
          otp +
          '</h1>',
      };
    } else {
      const message = reason
        ? `<h3>Your prescription is rejected</h3> ${reason}`
        : '<h3>Your prescription is approved</h3>';
      mailOptions = {
        from: envVariables.USER_NAME,
        to: email,
        subject: 'Prescription',
        html: message,
      };
    }
    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        sails.console.log(err);
      }
    });
  },
};