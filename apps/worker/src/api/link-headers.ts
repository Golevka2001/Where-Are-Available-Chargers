// RFC 8288 Link headers for agent discovery

export function addLinkHeaders(response: Response, pathname: string): Response {
  if (pathname !== '/') return response;

  const links = [
    `</.well-known/api-catalog>; rel="api-catalog"`,
    `</.well-known/agent-skills/index.json>; rel="describedby"`,
    `</.well-known/oauth-protected-resource>; rel="oauth-protected-resource"`,
    `</.well-known/mcp/server-card.json>; rel="mcp-server-card"`,
    `</sitemap.xml>; rel="sitemap"`,
  ];

  const headers = new Headers(response.headers);
  headers.set('Link', links.join(', '));

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
