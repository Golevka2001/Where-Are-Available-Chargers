// Agent Skills Discovery Index (RFC v0.2.0)

export function handleAgentSkills(): Response {
  const body = {
    $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
    skills: [
      {
        name: 'charger-status',
        type: 'skill-md',
        description:
          'Query real-time charger socket status for Southeast University campuses (jiulonghu, sipailou, dingjiaqiao)',
        url: '/.well-known/agent-skills/charger-status/SKILL.md',
        digest:
          'sha256:6c95cfb96052eba3aa9e51a0e99d0330bce141809c1a14991e7381fd584dd697',
      },
      {
        name: 'campus-list',
        type: 'skill-md',
        description: 'List all available campuses and their IDs',
        url: '/.well-known/agent-skills/campus-list/SKILL.md',
        digest:
          'sha256:71ba235a72acfc1038cdf7101655deefc41d74d001debd472faa888497b91cfb',
      },
      {
        name: 'weather-forecast',
        type: 'skill-md',
        description: 'Get weather forecast for a specific campus',
        url: '/.well-known/agent-skills/weather-forecast/SKILL.md',
        digest:
          'sha256:b3725158380e31b8af84a241bd7122296e83d77424cd085aa3e209d9593465c6',
      },
      {
        name: 'charger-history',
        type: 'skill-md',
        description:
          'Query historical charger usage data with configurable time ranges',
        url: '/.well-known/agent-skills/charger-history/SKILL.md',
        digest:
          'sha256:57c0988fee4c692706f09c8687d2dd69d8dd3ac099157671db640f17e09f1bd3',
      },
    ],
    links: [
      {
        rel: 'service-desc',
        href: '/.well-known/api-catalog',
        type: 'application/linkset+json',
      },
      {
        rel: 'self',
        href: '/.well-known/agent-skills/index.json',
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
