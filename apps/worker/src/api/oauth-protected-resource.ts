// OAuth 2.0 Protected Resource Metadata (RFC 9728)

const BASE = 'https://chargers.dpdns.org';

export function handleOAuthProtectedResource(): Response {
  const body = {
    resource: BASE,
    authorization_servers: [BASE],
    scopes_supported: ['read:status', 'read:history', 'read:weather'],
    bearer_methods_supported: ['header'],
    resource_documentation: 'https://github.com/Golevka2001/seu-chargers',
  };

  return new Response(JSON.stringify(body, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
