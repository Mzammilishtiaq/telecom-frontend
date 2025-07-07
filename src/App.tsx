import React from "react"
import AppRouting from './Rout';
import { ToastContainer } from 'react-toastify'
function App() {
  return (
     <>
      <AppRouting/>
      <ToastContainer/>
     </>
  )
}

export default App
// import React from 'react';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import PaymentForm from './component/PaymentForm';

// // Load Stripe.js with your public key
// const stripePromise = loadStripe('pk_test_51PpRavP6lHPaRyaTRXrSGEoqM4mmSk5jFFVtYkcNqK2TtiLOmFOsfP1SXlJX45LPXcdDlUbwRtEij7dX6gL1nIV400fgE7RU9a');

// function App() {
//   return (
//     <div className="">
//       <h1>Subscribe to Our Service</h1>
//       <Elements stripe={stripePromise}>
//         <PaymentForm />
//       </Elements>
//     </div>
//   );
// }

// export default App;
