"use server";
import axios from 'axios';
export async function sendEmail({
  to,
  subject,
  text,
  url,
  buttonText
}: {
  to: string;
  subject: string;
  text: string;
  url:string;
  buttonText:string;
}) {
    


  const message = {
    
    to: to.toLowerCase().trim(),
    from: process.env.EMAIL_FROM,
    subject: subject.trim(),
    text: text.trim(),
  };

  try {
    

// Construct the HTML content
const htmlContent = `
<div style="background: #f9f9f9; padding: 20px; text-align: center; border-radius: 10px;">
  <img src="https://drive.google.com/uc?export=view&id=1r56Ixs8n9QMXGYZ_3fzaB3onsZYyRfQB"
       alt="JengaScheme Logo"
       style="max-width: 100%; height: auto; margin: 20px auto; display: block; border-radius: 5px;">
  <p style="color: #444; font-size: 18px; font-weight: 500; margin: 15px 0;">
    🎉 Hurrah! You got the email!
  </p>
  <a href="${url}" style="display: inline-block; margin-top: 20px; padding: 12px 20px; font-size: 16px; font-weight: 600; color: #fff; background: #007bff; text-decoration: none; border-radius: 5px;">
    ${buttonText}
  </a>
  <p style="color: #666; font-size: 16px; line-height: 1.6; padding: 10px 15px; background: #fff; border-radius: 8px; display: inline-block; max-width: 80%;">
    ${text}
  </p>
  
</div>
`;
    // const transporter = nodemailer.createTransport({
    //   host:'smtp.gmail.com',
    //   port:587,
    //   secure:true,
    //   auth:{
    //     user:process.env.USEREMAIL,
    //     pass:process.env.USERPASS
    //   }
    // })

    // const info = await transporter.sendMail({
    //   from:'xyvielyons <xyvielyons@gmail.com>',
    //   to:message.to,
    //   subject:message.subject,
    //   html:html,
    //   text:message.text
    // })

    
    // Configure Brevo client
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      throw new Error('BREVO_API_KEY is not defined in environment variables');
    }
    const payload = {
      sender: { name: 'BillionaireOdds', email: 'xyvielyons@gmail.com' },
      to: [{ email: message.to }],
      subject: message.subject,
      htmlContent: htmlContent,
    };
    const response = await axios.post('https://api.brevo.com/v3/smtp/email', payload, {
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
      },
    });
    console.log('Email sent successfully:', response.data);

    return {
      success: true,
      messageId:response.data
    };

  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: "Failed to send email. Please try again later.",
    }
  }
}