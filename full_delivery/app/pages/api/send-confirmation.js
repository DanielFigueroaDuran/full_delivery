import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendConfirmationEmail(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST requests are allowed" });
  }

  const { email, orderId, orderDetails } = req.body;

  try {
    await sendgrid.send({
      to: "danielo2735@yahoo.com", // El correo electrónico del destinatario
      from: "figueroadurandanielelias", // Tu correo electrónico verificado por SendGrid
      subject: `Confirmación de tu compra - Orden #${orderId}`,
      html: `
        <h1>Gracias por tu compra!</h1>
        <p>Tu orden ha sido recibida y está siendo procesada.</p>
        <h2>Detalles de la Orden</h2>
        <p>Orden ID: ${orderId}</p>
        <p>${orderDetails}</p>
      `,
    });
    res.status(200).json({ message: "Correo de confirmación enviado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

export default sendConfirmationEmail;
