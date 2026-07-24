// 校区列表管理

import { defineStore } from 'pinia';
import { getCampuses } from '@/apis/campus';
import config from '@/config';
import { CampusConfig } from '@/types/campus-config';

export const useCampusStore = defineStore('campus', {
  state: () => ({
    campuses: [] as CampusConfig[],
    loaded: false,
  }),
  actions: {
    async fetchCampuses(): Promise<void> {
      try {
        const list = await getCampuses();
        this.campuses = list.map((item) => ({
          id: item.id,
          name: item.name,
          weatherApiPath: `/weather/${item.id}`,
          statusApiPath: `/get_status/${item.id}`,
          ...config.campusDefaults,
        }));
      } catch {
        this.campuses = [];
      }
      this.loaded = true;
    },
  },
});
