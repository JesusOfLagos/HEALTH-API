
import nodemailer from 'nodemailer';

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_APP, // Use your email service provider
  auth: {
    user: process.env.EMAIL_APP_USERNAME, // Your email address
    pass: process.env.EMAIL_APP_PASSWORD, // Your email password or App Password (for Gmail)
  },
});



  export async function TestMailService(req: any, res: any) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_APP_USERNAME,
        to: 'jesuswrites20043@gmail.com',
        subject: 'Welcome To Health-ISH',
        text: 'This is a test email sent from Health-ISH using nodemailer.',
      };
      await transporter.sendMail(mailOptions)
      return res.status(200).json({ message: "Email Sent Successfuly", success: true})
    } catch (error) {
      return res.status(500).json({message: error.message})
    }
  }
  

// Function to send an email
export async function sendMailToUser (email: string, title: string, content: string) {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_APP_USERNAME,
            to: email,
            subject: title,
            html: content
        })
        return true
    } catch (error) {
        return false
    }
}

