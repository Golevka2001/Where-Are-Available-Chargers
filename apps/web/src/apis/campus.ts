import axios from 'axios';
import type { CampusListItem } from '@/types/campus-config';

export const getCampuses = async (): Promise<CampusListItem[]> => {
  const res = await axios.get('/campuses').catch(() => null);
  return res?.data?.campuses ?? [];
};
