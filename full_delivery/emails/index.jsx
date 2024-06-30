import { Button, Html } from "@react-email/components";
import * as React from "react";

export default function Email() {
    return (
        <Html>
            <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', padding: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', fontFamily: 'Arial, sans-serif' }}>
                <h1 style={{ textAlign: 'center', color: '#FF6600', fontSize: '24px', marginBottom: '24px' }}>Food Order Confirmation</h1>
                <p style={{ textAlign: 'center', fontSize: '18px', marginBottom: '24px' }}>Thank you for your order! Your order has been confirmed and will be delivered shortly.</p>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#ffffff' }}>
                        <thead>
                            <tr style={{ backgroundColor: 'f8f8f8' }}>
                                <th style={{ padding: '12px 8px', borderBottom: '1px solid #dddddd' }}>Item</th>
                                <th style={{ padding: '12px 8px', borderBottom: '1px solid #dddddd' }}>Quantity</th>
                                <th style={{ padding: '12px 8px', borderBottom: '1px solid #dddddd' }}>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '12px 8px', borderBottom: '1px solid #dddddd' }}>Chicken Burger</td>
                                <td style={{ padding: '12px 8px', borderBottom: '1px solid #dddddd', textAlign: 'center' }}>2</td>
                                <td style={{ padding: '12px 8px', borderBottom: '1px solid #dddddd', textAlign: 'center' }}>$10.00</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '12px 8px', borderBottom: '1px solid #dddddd' }}>Pizza Margherita</td>
                                <td style={{ padding: '12px 8px', borderBottom: '1px solid #dddddd', textAlign: 'center' }}>1</td>
                                <td style={{ padding: '12px 8px', borderBottom: '1px solid #dddddd', textAlign: 'center' }}>$12.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div style={{ marginTop: '24px', textAlign: 'right' }}>
                    <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Total: $22.00</p>
                </div>

                <div style={{ marginTop: '24px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Delivery Information</h2>
                    <p style={{ margin: '0' }}>Address: 123 Main St, City, State, ZIP</p>
                    <p style={{ margin: '0' }}>Contact: (123) 456-7890</p>
                </div>
                <hr></hr>
                <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: '#666666' }}>Thank you for choosing our service! For any inquiries, please contact us at support@example.com.</p>
            </div>
        </Html>
    );
}