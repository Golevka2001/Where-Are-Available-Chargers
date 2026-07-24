// src/api/campuses.ts - GET /api/campuses 校区列表

import { CAMPUS_LIST, CAMPUS_CONFIG, CampusId } from '../config';

interface CampusListItem {
  id: CampusId;
  name: string;
}

export function handleGetCampuses(): Response {
  const campuses: CampusListItem[] = CAMPUS_LIST.map((id) => ({
    id,
    name: CAMPUS_CONFIG[id].name,
  }));

  return Response.json({ code: 200, campuses });
}
