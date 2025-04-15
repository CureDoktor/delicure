// Import the MailerSend library
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

// This is the handler function that Vercel will call
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log("API endpoint called");
    
    // Get the email data from the request body
    const { to, subject, html, text } = req.body;
    console.log("Email data received:", { to, subject, html, text });
    
    // Check if API key is available
    if (!process.env.MAILERSEND_API_KEY) {
      console.error("MAILERSEND_API_KEY is not defined");
      return res.status(500).json({ error: 'MailerSend API key is not configured' });
    }
    
    console.log("Initializing MailerSend client");
    
    // Initialize the MailerSend client
    const mailerSend = new MailerSend({
      apiKey: process.env.MAILERSEND_API_KEY,
    });

    console.log("Creating sender");
    
    // Create the sender
    const sentFrom = new Sender("info@delicure.com", "Deli Cure Orders");

    console.log("Creating recipients");
    
    // Create the recipients
    const recipients = [
      new Recipient(to, to.split('@')[0])
    ];

    console.log("Creating email parameters");
    
    // Create the email parameters
    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject(subject)
      .setHtml(html)
      .setText(text);

    console.log("Sending email");
    
    // Send the email
    const result = await mailerSend.email.send(emailParams);
    console.log("Email sent successfully:", result);

    // Return success
    return res.status(200).json({ success: true, message: 'Email sent successfully', result });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      error: 'Failed to send email', 
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
} 