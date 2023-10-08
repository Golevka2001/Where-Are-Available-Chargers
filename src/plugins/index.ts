import axiosPlugin from '@/plugins/axios';
import vuetify from '@/plugins/vuetify';
import VueViewerPlugin from '@/plugins/v-viewer';
import pinia from '@/store';
import router from '@/router';

import type { App } from 'vue';

export function registerPlugins(app: App) {
  app.use(axiosPlugin).use(vuetify).use(VueViewerPlugin).use(pinia).use(router);
}
