import { MailService } from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// sendgrip.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, orderDetails } = req.body;

    const msg = {
      to: email,
      from: "figueroadurandanielelias@gmail.com",
      subject: "Confirmación de tu compra",
      text: `Gracias por tu compra. Aquí están los detalles de tu pedido: ${orderDetails}`,
    };

    try {
      await sgMail.send(msg);
      res.status(200).json({ message: "Email enviado" });
    } catch (error) {
      res.status(500).json({ message: "Error al enviar el email", error });
    }
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
