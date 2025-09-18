---
sidebar_position: 3
title: Webhooks
---

# Webhooks

Webhooks allow you to receive real-time notifications about events in your YaPay account. When an event occurs, YaPay sends an HTTP POST request to your configured endpoint.

## Setting Up Webhooks

### Create an Endpoint

```bash
POST /api/v1/webhooks/endpoints

{
  "url": "https://example.com/webhooks",
  "events": ["payment.succeeded", "payment.failed"],
  "description": "Production webhook endpoint"
}
```

Response includes your webhook secret:

```json
{
  "id": "we_1abc2def3ghi",
  "secret": "whsec_xyz123abc456",
  "status": "enabled"
}
```

## Event Types

YaPay sends the following webhook events:

| Event | Description |
|-------|-------------|
| `payment.created` | Payment Intent was created |
| `payment.succeeded` | Payment was successfully completed |
| `payment.failed` | Payment failed |
| `payment.cancelled` | Payment was cancelled |
| `checkout.session.completed` | Checkout session was completed |
| `checkout.session.expired` | Checkout session expired |
| `refund.created` | Refund was created |
| `refund.succeeded` | Refund was successful |
| `refund.failed` | Refund failed |

## Webhook Payload

All webhook events follow this structure:

```json
{
  "id": "evt_1abc2def3ghi",
  "object": "event",
  "type": "payment.succeeded",
  "created": 1234567890,
  "data": {
    "object": {
      // The complete resource object
    }
  },
  "livemode": false
}
```

## Verifying Webhook Signatures

YaPay signs all webhook payloads using HMAC-SHA256. Always verify the signature to ensure the webhook is from YaPay.

### Verification Steps

1. Extract the signature from `X-YaPay-Signature` header
2. Compute HMAC-SHA256 of the raw request body
3. Compare signatures using constant-time comparison

### Node.js Example

```javascript
const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

// Express.js webhook handler
app.post('/webhook', express.raw({type: '*/*'}), (req, res) => {
  const signature = req.headers['x-yapay-signature'];
  const secret = process.env.WEBHOOK_SECRET;

  if (!verifyWebhookSignature(req.body, signature, secret)) {
    return res.status(400).send('Invalid signature');
  }

  const event = JSON.parse(req.body);

  // Handle the event
  switch (event.type) {
    case 'payment.succeeded':
      handlePaymentSuccess(event.data.object);
      break;
    case 'payment.failed':
      handlePaymentFailure(event.data.object);
      break;
    // ... handle other events
  }

  res.json({received: true});
});
```

### Python Example

```python
import hmac
import hashlib

def verify_webhook_signature(payload, signature, secret):
    expected_signature = hmac.new(
        secret.encode('utf-8'),
        payload,
        hashlib.sha256
    ).hexdigest()

    return hmac.compare_digest(signature, expected_signature)

# Flask webhook handler
@app.route('/webhook', methods=['POST'])
def webhook():
    payload = request.data
    signature = request.headers.get('X-YaPay-Signature')
    secret = os.environ['WEBHOOK_SECRET']

    if not verify_webhook_signature(payload, signature, secret):
        return 'Invalid signature', 400

    event = json.loads(payload)

    # Handle the event
    if event['type'] == 'payment.succeeded':
        handle_payment_success(event['data']['object'])
    elif event['type'] == 'payment.failed':
        handle_payment_failure(event['data']['object'])

    return jsonify({'received': True})
```

### PHP Example

```php
function verifyWebhookSignature($payload, $signature, $secret) {
    $expectedSignature = hash_hmac('sha256', $payload, $secret);
    return hash_equals($signature, $expectedSignature);
}

// Webhook handler
$payload = file_get_contents('php://input');
$signature = $_SERVER['HTTP_X_YAPAY_SIGNATURE'];
$secret = $_ENV['WEBHOOK_SECRET'];

if (!verifyWebhookSignature($payload, $signature, $secret)) {
    http_response_code(400);
    exit('Invalid signature');
}

$event = json_decode($payload, true);

// Handle the event
switch ($event['type']) {
    case 'payment.succeeded':
        handlePaymentSuccess($event['data']['object']);
        break;
    case 'payment.failed':
        handlePaymentFailure($event['data']['object']);
        break;
}

http_response_code(200);
echo json_encode(['received' => true]);
```

## Best Practices

### Idempotency

- Store and check event IDs to prevent duplicate processing
- Return 200 OK for already-processed events

```javascript
const processedEvents = new Set();

function handleWebhook(event) {
  if (processedEvents.has(event.id)) {
    console.log(`Already processed event ${event.id}`);
    return;
  }

  // Process the event
  processEvent(event);

  // Mark as processed
  processedEvents.add(event.id);
}
```

### Error Handling

- Return 2xx status codes quickly (< 20 seconds)
- Process events asynchronously if needed
- Log failures for debugging

```javascript
app.post('/webhook', async (req, res) => {
  const event = JSON.parse(req.body);

  // Respond immediately
  res.json({received: true});

  // Process asynchronously
  queue.push(async () => {
    try {
      await processEvent(event);
    } catch (error) {
      console.error(`Failed to process event ${event.id}:`, error);
      // Optionally retry or alert
    }
  });
});
```

### Retry Logic

YaPay retries failed webhooks with exponential backoff:

- Initial retry after 5 seconds
- Subsequent retries at increasing intervals
- Maximum of 25 attempts over 3 days

### Security

- **Always verify signatures** before processing
- **Use HTTPS endpoints** only
- **Validate event data** before taking action
- **Store secrets securely** in environment variables

## Testing Webhooks

### Local Development

Use tools like ngrok to expose your local server:

```bash
ngrok http 3000
```

Then configure your webhook URL:
```
https://abc123.ngrok.io/webhook
```

### Test Events

Send test events from the YaPay Dashboard or API:

```bash
curl -X POST https://yapay.to/api/v1/webhooks/test \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "endpoint_id": "we_1abc2def3ghi",
    "event_type": "payment.succeeded"
  }'
```

### Webhook Logs

View webhook delivery attempts in the dashboard:
- Request/response details
- Delivery status
- Retry attempts
- Error messages