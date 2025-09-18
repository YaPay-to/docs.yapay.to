---
sidebar_position: 1
title: Quick Start Guide
---

# Quick Start Guide

Get up and running with YaPay in minutes. This guide walks you through your first payment integration.

## Prerequisites

- YaPay account with API keys
- Server-side environment (Node.js, Python, PHP, etc.)
- Basic understanding of REST APIs

## Step 1: Install Dependencies

### Node.js

```bash
npm install axios
```

### Python

```bash
pip install requests
```

### PHP

```bash
composer require guzzlehttp/guzzle
```

## Step 2: Set Up Authentication

Store your API key securely:

```javascript
// .env file
YAPAY_API_KEY=test_sk_your_test_key_here

// config.js
const yapay = axios.create({
  baseURL: 'https://yapay.to/api/v1',
  headers: {
    'Authorization': `Bearer ${process.env.YAPAY_API_KEY}`,
    'Content-Type': 'application/json'
  }
});
```

## Step 3: Create Your First Payment

### Simple Payment Intent

```javascript
async function createPayment() {
  try {
    const payment = await yapay.post('/payments', {
      amount: 10000,  // 100.00 MXN (amount in cents)
      currency: 'MXN',
      customer: {
        email: 'customer@example.com',
        name: 'Juan Pérez'
      },
      metadata: {
        order_id: '12345',
        product: 'Premium Subscription'
      }
    });

    console.log('Payment created:', payment.data);
    return payment.data;
  } catch (error) {
    console.error('Error creating payment:', error.response.data);
    throw error;
  }
}
```

### Response

```json
{
  "id": "pay_1abc2def3ghi",
  "object": "payment_intent",
  "amount": 10000,
  "currency": "MXN",
  "status": "pending",
  "client_secret": "pay_1abc2def3ghi_secret_xyz123",
  "created": 1234567890,
  "livemode": false
}
```

## Step 4: Collect Payment Details

For PCI compliance, use YaPay's secure token generation on the frontend:

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://js.yapay.to/v1/yapay.js"></script>
</head>
<body>
  <form id="payment-form">
    <div id="card-element">
      <!-- YaPay card input will be inserted here -->
    </div>
    <button type="submit">Pay 100 MXN</button>
    <div id="error-message"></div>
  </form>

  <script>
    const yapay = YaPay('pk_test_your_publishable_key');
    const cardElement = yapay.elements().create('card');
    cardElement.mount('#card-element');

    document.getElementById('payment-form').addEventListener('submit', async (e) => {
      e.preventDefault();

      const {token, error} = await yapay.createToken(cardElement);

      if (error) {
        document.getElementById('error-message').textContent = error.message;
      } else {
        // Send token to your server
        confirmPayment(token.id);
      }
    });
  </script>
</body>
</html>
```

## Step 5: Confirm the Payment

On your server, confirm the payment with the token:

```javascript
async function confirmPayment(paymentId, token) {
  try {
    const result = await yapay.post(`/payments/${paymentId}/confirm`, {
      payment_method: 'card',
      payment_details: {
        token: token
      }
    });

    if (result.data.status === 'succeeded') {
      console.log('Payment successful!');
      // Update your database, send confirmation email, etc.
      return result.data;
    } else {
      console.log('Payment requires additional action');
      return result.data;
    }
  } catch (error) {
    console.error('Payment failed:', error.response.data);
    throw error;
  }
}
```

## Step 6: Handle Webhooks

Set up a webhook endpoint to receive real-time updates:

```javascript
const express = require('express');
const crypto = require('crypto');

const app = express();

// Important: Use raw body for signature verification
app.post('/webhook', express.raw({type: '*/*'}), (req, res) => {
  const signature = req.headers['x-yapay-signature'];
  const secret = process.env.WEBHOOK_SECRET;

  // Verify signature
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(req.body)
    .digest('hex');

  if (signature !== expectedSignature) {
    return res.status(400).send('Invalid signature');
  }

  const event = JSON.parse(req.body);

  // Handle different event types
  switch (event.type) {
    case 'payment.succeeded':
      console.log('Payment succeeded:', event.data.object.id);
      // Fulfill the order
      break;
    case 'payment.failed':
      console.log('Payment failed:', event.data.object.id);
      // Notify customer
      break;
    default:
      console.log('Unhandled event type:', event.type);
  }

  res.json({received: true});
});

app.listen(3000, () => {
  console.log('Webhook listener running on port 3000');
});
```

## Complete Example

Here's a complete Express.js application:

```javascript
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const crypto = require('crypto');

const app = express();
app.use(express.json());
app.use(express.static('public'));

// Configure YaPay client
const yapay = axios.create({
  baseURL: 'https://yapay.to/api/v1',
  headers: {
    'Authorization': `Bearer ${process.env.YAPAY_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

// Create payment endpoint
app.post('/create-payment', async (req, res) => {
  try {
    const payment = await yapay.post('/payments', {
      amount: req.body.amount,
      currency: 'MXN',
      customer: req.body.customer
    });

    res.json({
      clientSecret: payment.data.client_secret,
      paymentId: payment.data.id
    });
  } catch (error) {
    res.status(400).json({
      error: error.response?.data?.error || 'Payment creation failed'
    });
  }
});

// Confirm payment endpoint
app.post('/confirm-payment', async (req, res) => {
  try {
    const result = await yapay.post(
      `/payments/${req.body.paymentId}/confirm`,
      {
        payment_method: 'card',
        payment_details: {
          token: req.body.token
        }
      }
    );

    res.json({success: true, payment: result.data});
  } catch (error) {
    res.status(400).json({
      error: error.response?.data?.error || 'Payment confirmation failed'
    });
  }
});

// Webhook endpoint
app.post('/webhook', express.raw({type: '*/*'}), (req, res) => {
  const signature = req.headers['x-yapay-signature'];
  const secret = process.env.WEBHOOK_SECRET;

  // Verify signature
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(req.body)
    .digest('hex');

  if (signature !== expectedSignature) {
    return res.status(400).send('Invalid signature');
  }

  const event = JSON.parse(req.body);
  console.log('Webhook received:', event.type);

  // Process event asynchronously
  setImmediate(() => processWebhookEvent(event));

  res.json({received: true});
});

async function processWebhookEvent(event) {
  switch (event.type) {
    case 'payment.succeeded':
      // Update order status in database
      // Send confirmation email
      // Trigger fulfillment
      break;
    case 'payment.failed':
      // Update order status
      // Notify customer
      break;
  }
}

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

## Next Steps

- [Implement error handling](/guides/error-handling)
- [Add 3D Secure support](/guides/3d-secure)
- [Set up recurring payments](/guides/subscriptions)
- [Integrate mobile SDKs](/guides/mobile)
- [Customize checkout experience](/guides/checkout)

## Testing Your Integration

Before going live:

1. Test all payment scenarios using [test cards](/testing#test-cards)
2. Verify webhook signature validation
3. Test error handling and edge cases
4. Review security best practices
5. Switch to production API keys