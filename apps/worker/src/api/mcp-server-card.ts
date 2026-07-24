// MCP Server Card (SEP-1649)
// https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2127

const BASE = 'https://chargers.dpdns.org';

export function handleMcpServerCard(): Response {
  const body = {
    schema: 'https://modelcontextprotocol.io/schemas/2025-03-26/server-card',
    serverInfo: {
      name: 'SEU Chargers',
      version: '5.2.0',
    },
    transport: {
      type: 'streamable-http',
      url: `${BASE}/mcp`,
    },
    capabilities: {
      tools: {
        listChanged: false,
      },
      resources: {
        listChanged: false,
      },
    },
    tools: [
      {
        name: 'get_campuses',
        description: 'List all available Southeast University campuses',
        inputSchema: {
          type: 'object',
          properties: {},
          required: [],
        },
      },
      {
        name: 'get_charger_status',
        description: 'Get real-time EV charger socket status for a campus',
        inputSchema: {
          type: 'object',
          properties: {
            campusId: {
              type: 'string',
              enum: ['jiulonghu', 'sipailou', 'dingjiaqiao'],
              description: 'Campus ID',
            },
          },
          required: ['campusId'],
        },
      },
      {
        name: 'get_weather',
        description: 'Get weather forecast for a campus',
        inputSchema: {
          type: 'object',
          properties: {
            campusId: {
              type: 'string',
              enum: ['jiulonghu', 'sipailou', 'dingjiaqiao'],
              description: 'Campus ID',
            },
          },
          required: ['campusId'],
        },
      },
      {
        name: 'get_charger_history',
        description: 'Get historical charger usage data for a campus',
        inputSchema: {
          type: 'object',
          properties: {
            campusId: {
              type: 'string',
              enum: ['jiulonghu', 'sipailou', 'dingjiaqiao'],
              description: 'Campus ID',
            },
            range: {
              type: 'string',
              enum: ['1h', '6h', '24h', '7d'],
              description: 'Time range (default: 24h)',
            },
          },
          required: ['campusId'],
        },
      },
    ],
    resources: [
      {
        uri: `${BASE}/api/campuses`,
        name: 'Campus List',
        mimeType: 'application/json',
      },
    ],
  };

  return new Response(JSON.stringify(body, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
