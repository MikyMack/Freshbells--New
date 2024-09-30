// import React, { useState } from 'react';
// import axios from 'axios';
// import logo from '../../assets/logo/logo.png';

// const PaymentDO = () => {
//   const amount = 500;

//   const loadRazorpay = async () => {
//     const script = document.createElement('script');
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//     script.onload = () => handlePayment();
//     document.body.appendChild(script);
//   };

//   const handlePayment = async () => {
//     const createOrder = async () => {
//       try {
//         const response = await axios.post(
//           'https://api.razorpay.com/v1/orders',
//           {
//             amount: amount * 100, // amount in smallest currency unit
//             currency: 'INR',
//             receipt: 'order_rcptid_11'
//           },
//           {
//             auth: {
//               username: 'rzp_test_KGsckghPT4lMgy', // Your Razorpay key ID
//               password: 'cvQr69QXPiuJMg2B7Y5LjLLC' // Your Razorpay key secret
//             }
//           }
//         );

//         return response.data;
//       } catch (error) {
//         console.error('Error in creating order:', error);
//       }
//     };

//     const orderData = await createOrder();

//     if (!orderData) return;

//     const { id: order_id, amount: order_amount, currency } = orderData;

//     const options = {
//       key: 'rzp_test_KGsckghPT4lMgy', // Enter the Key ID generated from the Dashboard
//       amount: order_amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 means 50000 paise or Rs 500.
//       currency: currency,
//       name: 'Your Company Name',
//       description: 'Test Transaction',
//       image: logo,
//       order_id: order_id,
//       handler: function (response) {
//         alert(`Payment ID: ${response.razorpay_payment_id}`);
//         alert(`Order ID: ${response.razorpay_order_id}`);
//         alert(`Signature: ${response.razorpay_signature}`);
//         // Call your backend to verify the payment and update the order status
//         // sendTransactionIdToBackend(response.razorpay_payment_id, order_id);
//       },
//       prefill: {
//         name: 'Your Name',
//         email: 'your.email@example.com',
//         contact: '9999999999'
//       },
//       notes: {
//         address: 'Razorpay Corporate Office'
//       },
//       theme: { 
//         color: '#F37254'
//       }
//     };

//     const rzp1 = new window.Razorpay(options);
//     rzp1.open();
//   };

// //   const sendTransactionIdToBackend = async (payment_id, order_id) => {
// //     try {
// //       const response = await axios.post('http://your-backend-url/api/verify-payment', {
// //         payment_id,
// //         order_id
// //       });

// //       // Handle the response from your backend
// //       console.log(response.data);
// //     } catch (error) {
// //       console.error('Error in verifying payment:', error);
// //     }
// //   };

//   return (
//     <div>
//       <h2>Make a Payment</h2>
//       <p>{amount}</p>
//       <button onClick={loadRazorpay}>Pay Now</button>
//     </div>
//   );
// };

// export default PaymentDO;
