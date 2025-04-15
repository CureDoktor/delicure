// Using MailerSend from CDN
async function sendEmail() {
  try {
    // Check if the library is loaded
    if (typeof window.MailerSend === 'undefined') {
      console.error("MailerSend library not loaded");
      alert("Email service is currently unavailable. Please try again later.");
      return;
    }

    console.log("Starting email send process...");
    
    // Log the available MailerSend object to see its structure
    console.log("MailerSend object:", window.MailerSend);
    
    const mailerSend = new window.MailerSend({
      apiKey: "mlsn.7c3aab933e4b719f008f2bb425797a11be4383a4ac5deb8f0a92895b333fd55d",
    });

    console.log("MailerSend instance created");

    // Check if the required classes are available
    if (typeof window.MailerSend.Sender === 'undefined' || 
        typeof window.MailerSend.Recipient === 'undefined' || 
        typeof window.MailerSend.EmailParams === 'undefined') {
      console.error("Required MailerSend classes not found");
      alert("Email service configuration error. Please contact support.");
      return;
    }

    const sentFrom = new window.MailerSend.Sender("info@delicure.com", "Deli Cure Orders");
    console.log("Sender created");

    const recipients = [
      new window.MailerSend.Recipient("nikola_998@yahoo.com", "Nikola")
    ];
    console.log("Recipients created");

    const emailParams = new window.MailerSend.EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject("This is a Subject")
      .setHtml("<strong>This is the HTML content</strong>")
      .setText("This is the text content");
    
    console.log("Email parameters set");

    await mailerSend.email.send(emailParams);
    console.log("Email sent successfully!");
    alert("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    alert("Failed to send email: " + error.message);
  }
}

// Make the function available globally
window.sendEmail = sendEmail;

// Log when the script is loaded
console.log("test.js loaded");

