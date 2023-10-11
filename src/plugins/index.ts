import router from '@/router';
import pinia from '@/store';
import axiosPlugin from '@/plugins/axios';
import vuetify from '@/plugins/vuetify';
import VueViewerPlugin from '@/plugins/v-viewer';

import type { App } from 'vue';

export function registerPlugins(app: App) {
  app.use(router).use(pinia).use(axiosPlugin).use(vuetify).use(VueViewerPlugin);
}
