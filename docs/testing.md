---
sidebar_position: 4
title: Testing
---

# Testing Your Integration

Use test mode to safely develop and test your YaPay integration without processing real payments.

## Test Mode

Test mode uses separate API keys and data:
- API keys prefixed with `test_`
- Isolated from production data
- No real charges processed
- Full API functionality available

## Test Cards

Use these test card numbers to simulate different scenarios:

| Card Number | Description | Behavior |
|-------------|-------------|----------|
| `4242 4242 4242 4242` | Successful payment | Always succeeds |
| `4000 0000 0000 9995` | Declined (insufficient funds) | Always fails with `insufficient_funds` |
| `4000 0000 0000 0002` | Declined (generic) | Always fails with `card_declined` |
| `4000 0000 0000 0069` | Expired card | Fails with `expired_card` |
| `4000 0000 0000 0127` | Incorrect CVC | Fails with `incorrect_cvc` |
| `4000 0000 0000 0119` | Processing error | Fails with `processing_error` |
| `4000 0000 0000 3220` | 3D Secure required | Triggers 3D Secure flow |

### Test Card Details

For all test cards:
- **Expiry**: Any future date (e.g., 12/34)
- **CVV**: Any 3 digits (e.g., 123)
- **ZIP**: Any valid postal code

## Testing Payment Flows

### Successful Payment

```javascript
// Create payment with test card
const payment = await yapay.post('/payments', {
  amount: 10000,
  currency: 'MXN',
  customer: {
    email: 'test@example.com'
  }
});

// Confirm with successful test card
const result = await yapay.post(`/payments/${payment.id}/confirm`, {
  payment_method: 'card',
  payment_details: {
    token: 'tok_test_visa' // Test token for 4242...
  }
});

console.log(result.status); // "succeeded"
```

### Failed Payment

```javascript
// Confirm with declining test card
try {
  await yapay.post(`/payments/${payment.id}/confirm`, {
    payment_method: 'card',
    payment_details: {
      token: 'tok_test_insufficient_funds' // Test token for 4000...9995
    }
  });
} catch (error) {
  console.log(error.response.data.error.code); // "insufficient_funds"
}
```

## Testing Webhooks

### Webhook Test Endpoints

Create test-specific webhook endpoints:

```javascript
const testEndpoint = await yapay.post('/webhooks/endpoints', {
  url: 'https://example.com/test-webhook',
  events: ['payment.succeeded', 'payment.failed'],
  description: 'Test environment webhook'
});
```

### Triggering Test Events

1. **Via API actions**: Create and confirm test payments
2. **Manual triggers**: Use the dashboard to send test events
3. **API test endpoint**:

```bash
curl -X POST https://yapay.to/api/v1/webhooks/test \
  -H "Authorization: Bearer test_sk_..." \
  -d '{
    "endpoint_id": "we_test_123",
    "event_type": "payment.succeeded"
  }'
```

## Testing Error Handling

### Network Errors

Simulate network issues:

```javascript
// Test timeout handling
const axiosWithTimeout = axios.create({
  baseURL: 'https://yapay.to/api/v1',
  timeout: 1000 // 1 second timeout
});

try {
  await axiosWithTimeout.post('/payments', data);
} catch (error) {
  if (error.code === 'ECONNABORTED') {
    // Handle timeout
    console.log('Request timed out');
  }
}
```

### API Errors

Test your error handling:

```javascript
async function createPaymentWithErrorHandling(data) {
  try {
    return await yapay.post('/payments', data);
  } catch (error) {
    const errorType = error.response?.data?.error?.type;

    switch (errorType) {
      case 'validation_error':
        console.error('Invalid payment data:', error.response.data);
        break;
      case 'authentication_error':
        console.error('Authentication failed');
        break;
      case 'rate_limit_error':
        console.error('Rate limited, retry later');
        break;
      default:
        console.error('Unexpected error:', error);
    }
    throw error;
  }
}
```

## Test Scenarios

### Complete Integration Test

```javascript
describe('YaPay Integration', () => {
  it('should process a payment end-to-end', async () => {
    // 1. Create payment intent
    const payment = await yapay.post('/payments', {
      amount: 5000,
      currency: 'MXN'
    });

    expect(payment.data.status).toBe('pending');

    // 2. Confirm payment
    const confirmed = await yapay.post(
      `/payments/${payment.data.id}/confirm`,
      {
        payment_method: 'card',
        payment_details: { token: 'tok_test_visa' }
      }
    );

    expect(confirmed.data.status).toBe('succeeded');

    // 3. Verify webhook received
    const webhook = await waitForWebhook('payment.succeeded');
    expect(webhook.data.object.id).toBe(payment.data.id);

    // 4. Retrieve payment
    const retrieved = await yapay.get(`/payments/${payment.data.id}`);
    expect(retrieved.data.status).toBe('succeeded');
  });
});
```

### Edge Cases to Test

1. **Idempotency**: Retry same request
2. **Concurrency**: Multiple simultaneous requests
3. **Large amounts**: Maximum transaction limits
4. **Special characters**: Unicode in customer names
5. **Timezone handling**: Different time zones
6. **Currency precision**: Decimal handling

## Test Data Management

### Cleaning Test Data

Periodically clean test data:

```javascript
// List and cancel old test payments
const oldPayments = await yapay.get('/payments', {
  params: {
    created_before: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
    status: 'pending'
  }
});

for (const payment of oldPayments.data.data) {
  await yapay.post(`/payments/${payment.id}/cancel`);
}
```

### Test Data Fixtures

Create consistent test data:

```javascript
const testCustomers = {
  valid: {
    email: 'test@example.com',
    name: 'Test User'
  },
  invalid_email: {
    email: 'invalid-email',
    name: 'Test User'
  },
  unicode: {
    email: 'test@example.com',
    name: 'José García 日本語'
  }
};

const testAmounts = {
  minimum: 100,      // 1 MXN
  typical: 10000,    // 100 MXN
  large: 10000000,   // 100,000 MXN
  maximum: 99999999  // 999,999.99 MXN
};
```

## Moving to Production

### Pre-Production Checklist

- [ ] All test cases pass
- [ ] Error handling implemented
- [ ] Webhook signature verification
- [ ] Idempotency handling
- [ ] Rate limiting handled
- [ ] Logging configured
- [ ] Monitoring set up
- [ ] Security review completed

### Switching to Production

1. **Get production API keys** from dashboard
2. **Update configuration**:

```javascript
const apiKey = process.env.NODE_ENV === 'production'
  ? process.env.YAPAY_LIVE_KEY
  : process.env.YAPAY_TEST_KEY;

const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://yapay.to/api/v1'
  : 'https://sandbox.yapay.to/api/v1';
```

3. **Test with small amounts** first
4. **Monitor initial transactions** closely
5. **Have rollback plan** ready