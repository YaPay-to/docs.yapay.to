---
sidebar_position: 2
title: Authentication
---

# Authentication

The YaPay API uses API keys to authenticate requests. You can view and manage your API keys in the YaPay Dashboard.

## API Keys

YaPay provides two types of API keys:

### Test Mode Keys
- Prefix: `test_`
- Use for testing your integration
- No real payments are processed
- Isolated from production data

### Live Mode Keys
- Prefix: `live_`
- Use for production
- Processes real payments
- Handle with care

## Making Authenticated Requests

Authentication is performed via the `Authorization` header using Bearer authentication:

```bash
Authorization: Bearer YOUR_API_KEY
```

### Example Request

```bash
curl https://yapay.to/api/v1/payments \
  -H "Authorization: Bearer test_sk_1234567890abcdef" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 10000,
    "currency": "MXN"
  }'
```

### JavaScript Example

```javascript
const yapay = axios.create({
  baseURL: 'https://yapay.to/api/v1',
  headers: {
    'Authorization': 'Bearer test_sk_1234567890abcdef',
    'Content-Type': 'application/json'
  }
});

// Make authenticated request
const payment = await yapay.post('/payments', {
  amount: 10000,
  currency: 'MXN'
});
```

### Python Example

```python
import requests

headers = {
    'Authorization': 'Bearer test_sk_1234567890abcdef',
    'Content-Type': 'application/json'
}

response = requests.post(
    'https://yapay.to/api/v1/payments',
    headers=headers,
    json={
        'amount': 10000,
        'currency': 'MXN'
    }
)
```

## Security Best Practices

### Keep Your Keys Safe

- **Never commit API keys** to version control
- **Use environment variables** to store keys
- **Rotate keys regularly** through the dashboard
- **Use different keys** for different environments

### Environment Variables Example

```javascript
// .env file (add to .gitignore)
YAPAY_API_KEY=test_sk_1234567890abcdef

// Your application
const apiKey = process.env.YAPAY_API_KEY;
```

### Server-Side Only

- **Never use API keys in client-side code**
- **Always make API calls from your server**
- **Use client secrets** for frontend operations

## Rate Limiting

API requests are rate-limited to ensure fair usage:

- **Limit**: 100 requests per minute per API key
- **Headers**: Rate limit info included in responses
  - `X-RateLimit-Limit`: Maximum requests
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Reset timestamp

### Handling Rate Limits

```javascript
async function makeRequestWithRetry(fn) {
  try {
    return await fn();
  } catch (error) {
    if (error.response?.status === 429) {
      const resetTime = error.response.headers['x-ratelimit-reset'];
      const delay = (resetTime * 1000) - Date.now();

      console.log(`Rate limited. Waiting ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));

      return fn();
    }
    throw error;
  }
}
```

## Error Responses

Authentication failures return a `401 Unauthorized` status:

```json
{
  "error": {
    "type": "authentication_error",
    "message": "Invalid API key provided",
    "code": "invalid_api_key"
  }
}
```

Common authentication errors:

| Code | Description |
|------|-------------|
| `invalid_api_key` | The provided API key is invalid |
| `expired_api_key` | The API key has expired |
| `insufficient_permissions` | Key lacks required permissions |
| `wrong_environment` | Using test key in production or vice versa |