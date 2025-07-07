import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const cardElement = elements?.getElement(CardElement);
    if (!cardElement) {
      setError('Card element not available.');
      setLoading(false);
      return;
    }

    // Step 1: Create Payment Method
    const result = await stripe?.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        email,
      },
    });

    if (!result) {
      setError('Failed to create payment method.');
      setLoading(false);
      return;
    }

    if (result.error) {
      setError(result.error.message || '');
      setLoading(false);
      return;
    }

    const { paymentMethod } = result;

    // Step 2: Call Backend to Create Subscription
    try {
      const response = await fetch('http://localhost:3000/api/payment/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          paymentMethodId: paymentMethod?.id || '',
          priceId: 'price_1QZ002P6lHPaRyaT00000000', // Replace with your actual priceId
        }),
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        console.log('Subscription created successfully:', data);
        // Handle successful subscription creation (e.g., show success message, redirect, etc.)
      }
    } catch (error) {
      console.error('Error with subscription creation:', error);
      setError('Something went wrong with the subscription creation.');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <CardElement />
      </div>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Subscribe'}
      </button>
    </form>
  );
};

export default PaymentForm;
