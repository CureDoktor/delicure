// Function to send email using our API
async function sendEmail() {
  try {
    console.log("Starting email send process...");
    
    // Prepare the email data
    const emailData = {
      to: "nikola_998@yahoo.com",
      subject: "This is a Subject",
      html: "<strong>This is the HTML content</strong>",
      text: "This is the text content"
    };
    
    console.log("Sending request to API...");
    
    // Send the request to our API
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData)
    });
    
    // Check if the request was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send email');
    }
    
    const result = await response.json();
    console.log("Email sent successfully!", result);
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

