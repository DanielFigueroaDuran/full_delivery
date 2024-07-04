"use client"
import React, { useState } from 'react'

const EmailPrueba = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');


    const sendEmail = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                }),
            });
            const result = await response.json();
            setMessage(result.message);
        } catch (error) {
            setMessage('Error sending email');
        }
    };

    return (
        <div>
            <form onSubmit={sendEmail}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Recipient email"
                />
                <button type="submit">Send Email</button>
            </form>
            <p>{message}</p>
        </div>
    )
}

export default EmailPrueba