// Email service with MailerSend implementation
export async function sendOrderEmail(orderData) {
  console.log("Sending email to:", orderData.customer.email);
  
  // Format order items for email
  let itemsHtml = '';
  let totalAmount = 0;
  
  if (orderData.items.mala1.quantity > 0) {
    itemsHtml += `<tr><td>Mala kutija 1</td><td>${orderData.items.mala1.quantity}</td><td>${orderData.items.mala1.total.toLocaleString()} RSD</td></tr>`;
    totalAmount += orderData.items.mala1.total;
  }
  
  if (orderData.items.mala2.quantity > 0) {
    itemsHtml += `<tr><td>Mala kutija 2</td><td>${orderData.items.mala2.quantity}</td><td>${orderData.items.mala2.total.toLocaleString()} RSD</td></tr>`;
    totalAmount += orderData.items.mala2.total;
  }
  
  if (orderData.items.srednja.quantity > 0) {
    itemsHtml += `<tr><td>Srednja kutija</td><td>${orderData.items.srednja.quantity}</td><td>${orderData.items.srednja.total.toLocaleString()} RSD</td></tr>`;
    totalAmount += orderData.items.srednja.total;
  }
  
  if (orderData.items.velika.quantity > 0) {
    itemsHtml += `<tr><td>Velika kutija</td><td>${orderData.items.velika.quantity}</td><td>${orderData.items.velika.total.toLocaleString()} RSD</td></tr>`;
    totalAmount += orderData.items.velika.total;
  }

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
      <h1 style="color: #333; text-align: center;">Potvrda porudžbine - Deli Cure</h1>
      <p>Poštovani/a ${orderData.customer.ime} ${orderData.customer.prezime},</p>
      <p>Hvala vam na vašoj porudžbini. Potvrdili smo primitak vaše porudžbine i obradićemo je u najkraćem mogućem roku.</p>
      
      <h2 style="color: #333; margin-top: 20px;">Detalji porudžbine:</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr style="background-color: #f8f9fa;">
            <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Proizvod</th>
            <th style="padding: 10px; text-align: center; border: 1px solid #ddd;">Količina</th>
            <th style="padding: 10px; text-align: right; border: 1px solid #ddd;">Cena</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold; border: 1px solid #ddd;">Ukupno:</td>
            <td style="padding: 10px; text-align: right; font-weight: bold; border: 1px solid #ddd;">${totalAmount.toLocaleString()} RSD</td>
          </tr>
        </tfoot>
      </table>
      
      <h2 style="color: #333; margin-top: 20px;">Detalji dostave:</h2>
      <p><strong>Adresa:</strong> ${orderData.customer.adresa}</p>
      <p><strong>Telefon:</strong> ${orderData.customer.telefon}</p>
      <p><strong>Datum i vreme dostave:</strong> ${orderData.delivery.datetime}</p>
      
      <p style="margin-top: 30px;">Ako imate bilo kakvih pitanja, slobodno nas kontaktirajte.</p>
      <p>S poštovanjem,<br>Tim Deli Cure</p>
    </div>
  `;

  // Try to send email using MailerSend
  try {
    // Check if MailerSend is available
    if (typeof window !== 'undefined' && window.MailerSend) {
      console.log("MailerSend library found, attempting to send email");
      
      // Check if all required MailerSend components are available
      if (!window.Sender || !window.Recipient || !window.EmailParams) {
        console.error("MailerSend components missing:", {
          Sender: !!window.Sender,
          Recipient: !!window.Recipient,
          EmailParams: !!window.EmailParams
        });
        throw new Error("MailerSend components not fully loaded");
      }
      
      // Use the MailerSend library loaded via CDN
      const mailerSend = new window.MailerSend({
        apiKey: 'mlsn.7c3aab933e4b719f008f2bb425797a11be4383a4ac5deb8f0a92895b333fd55d' // Your MailerSend API key
      });

      const sentFrom = new window.Sender("info@delicure.rs", "Deli Cure Orders");
      const recipients = [
        new window.Recipient(orderData.customer.email, `${orderData.customer.ime} ${orderData.customer.prezime}`)
      ];

      const emailParams = new window.EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setReplyTo("nikola_998@yahoo.com")
        .setSubject("Potvrda porudžbine - Deli Cure")
        .setHtml(htmlContent)
        .setText(`Potvrda porudžbine - Deli Cure\n\nPoštovani/a ${orderData.customer.ime} ${orderData.customer.prezime},\n\nHvala vam na vašoj porudžbini. Potvrdili smo primitak vaše porudžbine i obradićemo je u najkraćem mogućem roku.\n\nDetalji porudžbine:\n${itemsHtml.replace(/<[^>]*>/g, '')}\n\nUkupno: ${totalAmount.toLocaleString()} RSD\n\nDetalji dostave:\n- Adresa: ${orderData.customer.adresa}\n- Telefon: ${orderData.customer.telefon}\n- Datum i vreme dostave: ${orderData.delivery.datetime}\n\nS poštovanjem,\nTim Deli Cure`);

      const response = await mailerSend.email.send(emailParams);
      console.log("Email sent successfully via MailerSend", response);
      return { success: true, simulated: false };
    } else {
      console.error("MailerSend library not available, falling back to simulation");
      // Simulate email sending for development/testing
      console.log("Simulating email sending to:", orderData.customer.email);
      console.log("Email content:", htmlContent);
      
      // Return success for simulation
      return { success: true, simulated: true };
    }
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error: error.message || "Unknown error occurred" };
  }
}

// Function to save order data to localStorage
export function saveOrderToLocalStorage(orderData) {
  try {
    // Create orders array if it doesn't exist
    let orders = JSON.parse(localStorage.getItem('delicure_orders') || '[]');
    
    // Add new order with timestamp
    orders.push({
      ...orderData,
      timestamp: new Date().toISOString(),
      id: Date.now().toString()
    });
    
    // Save back to localStorage
    localStorage.setItem('delicure_orders', JSON.stringify(orders));
    
    return { success: true };
  } catch (error) {
    console.error("Error saving order:", error);
    return { success: false, error: error.message };
  }
}

// Function to process an order (save and send email)
export async function processOrder(orderData) {
  // First save the order
  const saveResult = saveOrderToLocalStorage(orderData);
  
  if (!saveResult.success) {
    return { success: false, error: saveResult.error };
  }
  
  // Then try to send the email
  const emailResult = await sendOrderEmail(orderData);
  
  return {
    success: true,
    email_sent: emailResult.success,
    email_error: emailResult.error,
    simulated: emailResult.simulated
  };
} 