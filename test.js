// Function to send email using our API
async function sendEmail() {
  try {
    console.log("Starting email send process...");
    
    // Prepare the email data
    const emailData = {
      to: "nikolacurcic190@gmail.com",
      subject: "This is a Subject",
      html: "<strong>This is the HTML content</strong>",
      text: "This is the text content"
    };
    
    console.log("Sending request to API with data:", emailData);
    
    // Send the request to our API
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData)
    });
    
    // Get the response data
    const responseData = await response.json();
    console.log("API response:", responseData);
    
    // Check if the request was successful
    if (!response.ok) {
      throw new Error(responseData.error || 'Failed to send email');
    }
    
    console.log("Email sent successfully!", responseData);
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

