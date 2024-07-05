import { sgMail } from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req, res) {
  //   if (req.method === "POST") {
  //     const { to, subject, message } = req.body;

  //     try {
  //       await sgMail.send({
  //         to,
  //         from: "figueroadurandanoelelias@gmail.com", // Cambia esto a tu correo verificado en SendGrid
  //         subject,
  //         text: message,
  //       });

  //       res.status(200).json({ message: "Correo enviado!" });
  //     } catch (error) {
  //       console.error(error);
  //       res.status(500).json({ message: "Error al enviar el correo." });
  //     }
  //   } else {
  //     res.setHeader("Allow", ["POST"]);
  //     res.status(405).end(`Method ${req.method} Not Allowed`);
  //   }

  fetch(sendGridEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Other necessary headers
    },
    body: JSON.stringify(emailData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Handle the JSON response from SendGrid
    })
    .catch((error) => {
      // Handle errors, including the case where the response is not valid JSON
    });

  //--------------------------------------------------------------------------------
  //   try {
  //     await sgMail.send({
  //       to: req.body.to, // El correo electrónico del destinatario
  //       from: "figueroadurandanielelias@gmail.com", // Tu correo electrónico verificado por SendGrid
  //       subject: req.body.subject,
  //       text: req.body.message,
  //       html: `<p>${req.body.message}</p>`,
  //     });
  //     res.status(200).json({ message: "Correo enviado" });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: error.message });
  //   }
}

export default sendEmail;
