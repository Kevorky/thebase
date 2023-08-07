const nodemailer = require("nodemailer");
const nodemailerConfig = require("./nodemailerConfig");

const sendEmail = async ({ to, subject, html }) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport(nodemailerConfig);

  return transporter.sendMail({
    from: process.env.GMAIL,
    to,
    subject,
    html,
    // text,
  });

  // to: "kevorkyer@hotmail.com",
  //     subject: "Testing...",
  //     text: "That was easy!",
  //     html: "<h2>That was easy!</h2>",

  // let info = await transporter.sendMail(mailDetails, function (err, data) {
  //   if (err) {
  //     console.log("Error Occurs");
  //   } else {
  //     console.log("Email sent successfully");
  //   }
  // });
};

module.exports = sendEmail;
