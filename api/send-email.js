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
    
    console.log("API Key available:", process.env.MAILERSEND_API_KEY.substring(0, 10) + "...");
    
    // Try a simpler approach using fetch directly to the MailerSend API
    console.log("Using direct API call approach");
    
    const response = await fetch('https://api.mailersend.com/v1/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MAILERSEND_API_KEY}`
      },
      body: JSON.stringify({
        from: {
          email: "info@delicure.rs",
          name: "Deli Cure Orders"
        },
        to: [
          {
            email: to,
            name: to.split('@')[0]
          }
        ],
        subject: subject,
        html: html,
        text: text
      })
    });
    
    const responseData = await response.json();
    console.log("MailerSend API response:", responseData);
    
    if (!response.ok) {
      // Check for domain verification error
      if (responseData.message && responseData.message.includes("must be one of the verified domains")) {
        return res.status(400).json({ 
          error: 'Domain verification required', 
          details: 'The recipient domain must be verified in your MailerSend account. Please verify the domain or use a different email address.',
          mailerSendError: responseData
        });
      }
      
      throw new Error(`MailerSend API error: ${JSON.stringify(responseData)}`);
    }
    
    // Return success
    return res.status(200).json({ success: true, message: 'Email sent successfully', result: responseData });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      error: 'Failed to send email', 
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
} 