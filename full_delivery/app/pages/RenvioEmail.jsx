"use client"
import React, { useState } from 'react'

const RenvioEmail = () => {
    const [orderId, setOrderId] = useState(null);
    const [orderDetails, setOrderDetails] = useState("");
    const [email, setEmail] = useState("");

    const handlePurchase = async () => {
        // Lógica para procesar la compra
        // ...

        // Una vez que la compra se haya procesado con éxito, envía el correo de confirmación
        const response = await fetch("/api/send-confirmation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, orderId, orderDetails }),
        });

        if (response.ok) {
            alert("Correo de confirmación enviado!");
        } else {
            const error = await response.json();
            alert("Error al enviar el correo: " + error.message);
        }
    };

    return (
        <div>
            {/* Formulario o componente para realizar la compra */}
            <button onClick={handlePurchase}>Realizar Compra</button>
        </div>
    );
}

export default RenvioEmail