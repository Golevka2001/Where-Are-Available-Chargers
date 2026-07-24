// OAuth 2.0 Authorization Server Metadata (RFC 8414)
// and OpenID Connect Discovery (OIDC)

const BASE = 'https://chargers.dpdns.org';

export function handleOAuthDiscovery(): Response {
  const body = {
    issuer: BASE,
    authorization_endpoint: `${BASE}/oauth/authorize`,
    token_endpoint: `${BASE}/oauth/token`,
    jwks_uri: `${BASE}/.well-known/jwks.json`,
    registration_endpoint: `${BASE}/oauth/register`,
    scopes_supported: ['read:status', 'read:history', 'read:weather'],
    response_types_supported: ['code'],
    grant_types_supported: ['authorization_code', 'client_credentials'],
    token_endpoint_auth_methods_supported: [
      'client_secret_basic',
      'client_secret_post',
    ],
    service_documentation: 'https://github.com/Golevka2001/seu-chargers',
    ui_locales_supported: ['en', 'zh'],
  };

  return new Response(JSON.stringify(body, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
