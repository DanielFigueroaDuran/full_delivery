"use client"
import { useState } from "react";


const ContactForm = () => {
    const [formData, setFormData] = useState({
        to: "",
        subject: "",
        message: "",
    });

    console.log(formData)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/email.js", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                alert("Correo enviado!");
            } else {
                const error = await res.json();
                alert("Error al enviar el correo: " + error.message);
            };
        } catch (error) {
            console.error("Error al enviar el correo:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                name="to"
                placeholder="Correo del destinatario"
                value={formData.to}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="subject"
                placeholder="Asunto"
                value={formData.subject}
                onChange={handleChange}
                required
            />
            <textarea
                name="message"
                placeholder="Mensaje"
                value={formData.message}
                onChange={handleChange}
                required
            />
            <button type="submit">Enviar</button>
        </form>
    );
}

export default ContactForm