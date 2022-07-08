import nodemailer from 'nodemailer';

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

  const mailData = {
    from: process.env.MAILER_LOGIN,
    to: 'management@driftershoots.com',
    subject: `Message From ${req.body.name}`,
    text: `${req.body.message} | Sent from: ${req.body.email}`,
    html: `<div>${req.body.message}</div><p>Sent from:
    ${req.body.email} ${req.body.phoneNumber}</p>`,
  };

  transporter.sendMail(mailData, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });

  console.log(req.body);

  res.status(200);
  res.send();
}
