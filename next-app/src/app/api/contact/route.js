import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req) {
  try {
    const formData = await req.json(); // Get the form data from the request body

    const { name, email, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      console.error(
        'Missing name, email, subject, or message. These fields are required so please fill them out in the form.'
      );
      return new Response(JSON.stringify({ message: 'Missing name, email, subject, or message body.' }), {
        status: 400,
      });
    }

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Message from ${name} - ${subject}`,
      text: message,
      html: `
          <h1>Message from ${name}</h1>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `, // HTML content
    };

    await transporter.sendMail(mailOptions);
    
    return new Response(JSON.stringify({ message: 'Message sent successfully!' }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Error sending message.' }), {
      status: 500,
    });
  }
}
