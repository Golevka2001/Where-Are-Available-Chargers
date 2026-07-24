// WebMCP support - exposes site tools to AI agents via the browser
// https://webmachinelearning.github.io/webmcp/

const API_BASE = '';

interface McpTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (input: Record<string, unknown>) => Promise<string>;
}

const tools: McpTool[] = [
  {
    name: 'get_campuses',
    description: 'List all available Southeast University campuses',
    inputSchema: {
      type: 'object',
      properties: {},
      required: [],
    },
    execute: async () => {
      const res = await fetch(`${API_BASE}/api/campuses`);
      return res.text();
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
    execute: async (input) => {
      const res = await fetch(`${API_BASE}/api/get_status/${input.campusId}`);
      return res.text();
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
    execute: async (input) => {
      const res = await fetch(`${API_BASE}/api/weather/${input.campusId}`);
      return res.text();
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
    execute: async (input) => {
      const range = input.range || '24h';
      const res = await fetch(
        `${API_BASE}/api/history/${input.campusId}?range=${range}`,
      );
      return res.text();
    },
  },
];

export function initWebMcp(): void {
  // Check if the WebMCP API is available
  const nav = navigator as Navigator & {
    modelContext?: {
      provideContext: (context: {
        name: string;
        description: string;
        tools: Array<{
          name: string;
          description: string;
          inputSchema: Record<string, unknown>;
          execute: (input: Record<string, unknown>) => Promise<string>;
        }>;
      }) => void;
    };
  };

  if (!nav.modelContext?.provideContext) {
    return;
  }

  try {
    nav.modelContext.provideContext({
      name: 'SEU Chargers',
      description:
        'Real-time EV charger availability tracker for Southeast University (东南大学)',
      tools,
    });
    console.log('[WebMCP] Context provided with', tools.length, 'tools');
  } catch (e) {
    console.warn('[WebMCP] Failed to provide context:', e);
  }
}
