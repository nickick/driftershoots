import nodemailer from 'nodemailer';

// eslint-disable-next-line func-names
export default function (req, res) {
  const transporter = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.MAILER_LOGIN,
      pass: process.env.MAILER_PASSWORD,
    },
    secure: true,
  });

  const {
    name, email, phoneNumber, message,
  } = req.body;

  const mailData = {
    from: process.env.MAILER_LOGIN,
    to: 'management@driftershoots.com',
    subject: `Message From ${name}`,
    text: `${message} | Sent from: ${email}`,
    html: `<div>${message}</div><p>Sent from:
    ${email} ${phoneNumber}</p>`,
  };

  if (req.body.name && req.body.email && req.body.phoneNumber) {
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        res.status(500);
      } else {
        // eslint-disable-next-line no-console
        console.log(info);
        res.status(200);
      }
    });
  } else {
    req.status(500);
  }

  res.send();
}
