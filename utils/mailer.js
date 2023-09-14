const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "testbiman37@gmail.com",
    pass: "test2.in",
  },
});

function sendWeatherReport(email, weatherData) {
  const mailOptions = {
    from: "testbiman37@gmail.com",
    to: email,
    subject: "Weather Report",
    text: `Weather report:\n\n${JSON.stringify(weatherData, null, 2)}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

module.exports = { sendWeatherReport };
