import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  // 1. Configurar el transporter (quien envia)
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // 2. Definir las opciones del correo

  const mailOptions = {
    from: 'Danilo Olivos <hello@natours.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  // 3. Enviar el correo

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
