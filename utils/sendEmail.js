const nodemailer = require("nodemailer");

//! create the function
exports.sendEmail = async (to, resetToken) => {
  try {
    //Create transport
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "nodejsguy2022@gmail.com",
        pass: "cqlnxvzibxspbpsu",
      },
    });
    // ? Create the message
    const message = {
      to,
      subject: "Password",
      html: `
              <p>You are receiving this email because you (or someone else) have requested the reset of a password.</p>
              <p>Please click on the following link, or paste this into your browser to complete the process:</p>
              <p>http://localhost:3000/reset-password/${resetToken}</p>
              <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
             
            `,
    };
    //Send thr email
    const info = await transport.sendMail(message);
    console.log("Message sent", info.messageId);
  } catch (error) {
    console.log(error);
    throw new Error("Email could not be sent");
  }
};
