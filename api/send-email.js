// Import the MailerSend library
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

// This is the handler function that Vercel will call
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the email data from the request body
    const { to, subject, html, text } = req.body;

    // Initialize the MailerSend client
    const mailerSend = new MailerSend({
      apiKey: process.env.MAILERSEND_API_KEY,
    });

    // Create the sender
    const sentFrom = new Sender("info@delicure.com", "Deli Cure Orders");

    // Create the recipients
    const recipients = [
      new Recipient(to, to.split('@')[0])
    ];

    // Create the email parameters
    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject(subject)
      .setHtml(html)
      .setText(text);

    // Send the email
    await mailerSend.email.send(emailParams);

    // Return success
    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
} 