# Cloudflare API Reference

This page provides comprehensive information about the Cloudflare API, including endpoints, authentication, and usage examples.

## OpenAPI Specification

The complete Cloudflare API specification is available as an OpenAPI 3.0 document. This specification includes:

- **2,000+ API endpoints** across all Cloudflare services
- Complete request/response schemas
- Authentication requirements
- Rate limiting information
- Example requests and responses

### Download the OpenAPI Spec

- **JSON Format**: [openapi.json](../openapi.json) (8MB)
- **Source**: [Cloudflare API Schemas Repository](https://github.com/cloudflare/api-schemas)

### Using the OpenAPI Specification

You can use the OpenAPI specification with various tools:

1. **API Documentation Tools**:
   - [Swagger UI](https://swagger.io/tools/swagger-ui/)
   - [Redoc](https://redocly.github.io/redoc/)
   - [Stoplight](https://stoplight.io/)

2. **Code Generation**:
   - Generate client libraries in multiple languages
   - Create server stubs and mocks
   - Generate API documentation

3. **Testing and Development**:
   - Import into Postman or Insomnia
   - Use with API testing frameworks
   - Validate requests and responses

## API Base URL

All Cloudflare API requests use the base URL:
```
https://api.cloudflare.com/client/v4
```

## Authentication

### API Tokens (Recommended)
Create scoped API tokens with specific permissions:

```bash
curl -X GET "https://api.cloudflare.com/client/v4/zones" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json"
```

### Global API Key (Legacy)
Use with your Cloudflare email address:

```bash
curl -X GET "https://api.cloudflare.com/client/v4/zones" \
  -H "X-Auth-Email: user@example.com" \
  -H "X-Auth-Key: YOUR_GLOBAL_API_KEY" \
  -H "Content-Type: application/json"
```

## Popular API Endpoints

### Zones Management
- `GET /zones` - List zones
- `POST /zones` - Create a zone
- `GET /zones/{zone_id}` - Zone details
- `PATCH /zones/{zone_id}` - Update zone settings
- `DELETE /zones/{zone_id}` - Delete zone

### DNS Records
- `GET /zones/{zone_id}/dns_records` - List DNS records
- `POST /zones/{zone_id}/dns_records` - Create DNS record
- `PUT /zones/{zone_id}/dns_records/{record_id}` - Update DNS record
- `DELETE /zones/{zone_id}/dns_records/{record_id}` - Delete DNS record

### Workers
- `GET /accounts/{account_id}/workers/scripts` - List Worker scripts
- `PUT /accounts/{account_id}/workers/scripts/{script_name}` - Upload Worker script
- `GET /zones/{zone_id}/workers/routes` - List Worker routes
- `POST /zones/{zone_id}/workers/routes` - Create Worker route

### Page Rules
- `GET /zones/{zone_id}/pagerules` - List page rules
- `POST /zones/{zone_id}/pagerules` - Create page rule
- `PATCH /zones/{zone_id}/pagerules/{rule_id}` - Update page rule

## Response Format

All API responses follow this structure:

```json
{
  "success": true,
  "errors": [],
  "messages": [],
  "result": {
    // Response data here
  },
  "result_info": {
    "page": 1,
    "per_page": 20,
    "count": 1,
    "total_count": 1
  }
}
```

## Error Handling

Errors are returned in the `errors` array with this format:

```json
{
  "success": false,
  "errors": [
    {
      "code": 1003,
      "message": "Invalid or missing zone ID."
    }
  ],
  "messages": [],
  "result": null
}
```

## Rate Limits

API rate limits vary by endpoint:
- Most endpoints: 1,200 requests per 5 minutes
- High-volume endpoints: Higher limits available
- Rate limit headers included in responses

## SDKs and Libraries

Official and community SDKs available for:
- [JavaScript/Node.js](https://github.com/cloudflare/cloudflare-typescript)
- [Python](https://github.com/cloudflare/python-cloudflare)
- [Go](https://github.com/cloudflare/cloudflare-go)
- [PHP](https://github.com/cloudflare/cloudflare-php)

## Support and Resources

- [Cloudflare API Documentation](https://developers.cloudflare.com/api/)
- [Developer Discord](https://discord.gg/cloudflaredev)
- [Community Forum](https://community.cloudflare.com/)
- [GitHub Issues](https://github.com/cloudflare/api-schemas/issues)

## Next Steps

1. **Get API Credentials**: Create an API token in your Cloudflare dashboard
2. **Explore the OpenAPI Spec**: Download and open the specification file
3. **Try Basic Requests**: Start with simple endpoints like listing zones
4. **Build Your Integration**: Use the full API specification to build your application
