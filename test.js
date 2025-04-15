// Using MailerSend from CDN
async function sendEmail() {
  try {
    const mailerSend = new MailerSend({
      apiKey: "mlsn.7c3aab933e4b719f008f2bb425797a11be4383a4ac5deb8f0a92895b333fd55d",
    });

    const sentFrom = new Sender("orders@delicure.com", "Deli Cure Orders");

    const recipients = [
      new Recipient("nikola_998@yahoo.com", "Nikola")
    ];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject("This is a Subject")
      .setHtml("<strong>This is the HTML content</strong>")
      .setText("This is the text content");

    await mailerSend.email.send(emailParams);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// Make the function available globally
window.sendEmail = sendEmail;

