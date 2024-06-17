const nodemailer = require("nodemailer")

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      service:"Gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      secure: true,
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    })

    let info = await transporter.sendMail({
      from: `${process.env.MAIL_USER}`, // sender address
      to: `${email}`, // list of receivers
      subject: `${title}`, // Subject line
      html: `${body}`, // html body
    }).then((data)=>{console.log('Mail sent', data)})
    .catch(err => {console.error('Failure',err)})
    console.log("info console",info.response)
    // return info;
  } catch (error) {
    console.log(error.message)
    return error.message
  }
}

module.exports = mailSender ;
