// RFC 9727 API Catalog

const BASE = 'https://chargers.dpdns.org';

export function handleApiCatalog(): Response {
  const body = {
    linkset: [
      {
        anchor: `${BASE}/api`,
        'service-desc': [
          {
            href: '/.well-known/api-catalog',
            title: 'API Catalog (OpenAPI 3.2)',
          },
        ],
        'service-doc': [
          {
            href: 'https://github.com/Golevka2001/seu-chargers',
            title: 'Project Source & Documentation',
          },
        ],
        item: [
          { href: '/api/campuses', title: '校区列表 (Campus List)' },
          {
            href: '/api/get_status/{campusId}',
            title: '充电桩实时状态 (Charger Status)',
            templated: true,
          },
          {
            href: '/api/weather/{campusId}',
            title: '天气信息 (Weather)',
            templated: true,
          },
          {
            href: '/api/history/{campusId}',
            title: '历史记录 (History)',
            templated: true,
          },
        ],
      },
    ],
  };

  return new Response(JSON.stringify(body, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/linkset+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
