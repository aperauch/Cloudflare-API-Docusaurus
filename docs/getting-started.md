# Getting Started with Cloudflare API

Welcome to the Cloudflare API documentation! This guide will help you get started with making your first API requests.

## Prerequisites

- A Cloudflare account
- An active domain (for most operations)
- Basic knowledge of REST APIs and HTTP requests

## Step 1: Authentication Setup

### Option A: API Tokens (Recommended)

API tokens provide granular permissions and are more secure than global API keys.

1. **Create an API Token**:
   - Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
   - Navigate to "My Profile" → "API Tokens"
   - Click "Create Token"

2. **Choose Template or Custom**:
   - Use a preset template for common tasks
   - Or create a custom token with specific permissions

3. **Configure Permissions**:
   ```
   Zone:Zone Settings:Edit, Zone:Zone:Read
   ```

4. **Test Your Token**:
   ```bash
   curl -X GET "https://api.cloudflare.com/client/v4/user/tokens/verify" \
     -H "Authorization: Bearer YOUR_TOKEN_HERE" \
     -H "Content-Type: application/json"
   ```

### Option B: Global API Key

⚠️ **Note**: Global API keys have full account access. Use API tokens when possible.

1. **Find Your Global API Key**:
   - Go to "My Profile" → "API Tokens"
   - Click "View" next to "Global API Key"

2. **Use with Email**:
   ```bash
   curl -X GET "https://api.cloudflare.com/client/v4/zones" \
     -H "X-Auth-Email: your-email@example.com" \
     -H "X-Auth-Key: YOUR_GLOBAL_API_KEY" \
     -H "Content-Type: application/json"
   ```

## Step 2: Your First API Request

Let's start by listing your zones (domains) in Cloudflare:

```bash
curl -X GET "https://api.cloudflare.com/client/v4/zones" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json"
```

**Expected Response**:
```json
{
  "success": true,
  "errors": [],
  "messages": [],
  "result": [
    {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "name": "example.com",
      "status": "active",
      "paused": false,
      "type": "full",
      "development_mode": 0,
      "name_servers": [
        "ns1.cloudflare.com",
        "ns2.cloudflare.com"
      ]
    }
  ],
  "result_info": {
    "page": 1,
    "per_page": 20,
    "count": 1,
    "total_count": 1
  }
}
```

## Step 3: Common Operations

### Get Zone Details
```bash
curl -X GET "https://api.cloudflare.com/client/v4/zones/{zone_id}" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json"
```

### List DNS Records
```bash
curl -X GET "https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_records" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json"
```

### Create DNS Record
```bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_records" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{
    "type": "A",
    "name": "subdomain",
    "content": "192.168.1.1",
    "ttl": 1
  }'
```

## Step 4: Error Handling

Always check the `success` field in the response:

```python
import requests

response = requests.get(
    "https://api.cloudflare.com/client/v4/zones",
    headers={
        "Authorization": "Bearer YOUR_TOKEN",
        "Content-Type": "application/json"
    }
)

data = response.json()

if data["success"]:
    # Process the result
    zones = data["result"]
    print(f"Found {len(zones)} zones")
else:
    # Handle errors
    for error in data["errors"]:
        print(f"Error {error['code']}: {error['message']}")
```

## Step 5: Rate Limiting

Be aware of rate limits:
- Most endpoints: 1,200 requests per 5 minutes
- Check response headers for rate limit status:
  - `CF-Ray`: Request ID for support
  - `X-RateLimit-Limit`: Requests per period
  - `X-RateLimit-Remaining`: Requests remaining
  - `X-RateLimit-Reset`: Reset time (Unix timestamp)

## Next Steps

1. **Explore the [API Reference](./api-reference.md)** for detailed endpoint documentation
2. **Download the [OpenAPI Specification](/openapi.json)** for your tools
3. **Join the [Developer Community](https://discord.gg/cloudflaredev)** for support
4. **Check out [SDKs and Libraries](./api-reference.md#sdks-and-libraries)** for your language

## Common Use Cases

- **DNS Management**: Automate DNS record creation and updates
- **Security Settings**: Configure WAF rules and security policies
- **Performance Optimization**: Manage caching and page rules
- **Worker Deployments**: Deploy and manage serverless functions
- **Analytics**: Retrieve traffic and security metrics
- **Load Balancing**: Configure traffic distribution
- **SSL/TLS**: Manage certificates and encryption settings

Ready to start building? Check out the complete [API Reference](./api-reference.md) for detailed documentation of all available endpoints.
