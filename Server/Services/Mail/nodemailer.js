
const nodemailer = require('nodemailer');

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use your email service provider
  auth: {
    user: 'feedxpay@gmail.com', // Your email address
    pass: 'yhsvyrfaqqcctdsy', // Your email password or App Password (for Gmail)
  },
});

// Example usage:
const mailOptions = {
    from: 'feedxpay@gmail.com',
    to: 'rufai.faruk.67@gmail.com',
    subject: 'Welcome To Health-ISH',
    text: 'This is a test email sent from Node.js using nodemailer.',
  };
  

// Function to send an email
export async function sendEmail(req, res) {
  try {
    // Send the email using the transporter
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent:', info.response);
    return res.json({ message: "email sent", info});
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Rethrow the error for handling at the caller's level
  }
}




export async function sendOTPToMail (otp, email) {
  try {
    const htmlContent = `
    <p>This is you OTP sent from FeedXPay to verify your account.</p>
    <p>Your OTP is: <strong>${otp}</strong></p>
    <p>This OTP will expire in 5 minutes.</p>
  `;

   await transporter.sendMail({
    from: 'feedxpay@gmail.com',
    to: email,
    subject: 'OTP for Verification',
    html: htmlContent
  });
  } catch (error) {
    return
  }
}