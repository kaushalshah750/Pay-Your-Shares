import nodemailer from 'nodemailer';

// Create a nodemailer transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'atozbestdealsforyou@gmail.com', // Your Gmail address
      pass: 'rcbc kyei jarc qgsj' // Your Gmail password or App Password
    }
});

// Define a function to send emails
const sendEmail = async (to, subject, text) => {
    try {
        // Send mail with defined transport object
        await transporter.sendMail({
        from: '"Pay Your Share" <atozbestdealsforyou@gmail.com>', // Sender address (your Gmail address)
        to: to, // List of recipients
        subject: subject, // Subject line
        html: text // HTML text body
        });

        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
  

module.exports = { sendEmail };