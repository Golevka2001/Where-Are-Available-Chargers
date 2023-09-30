// Plugins
import axiosPlugin from '@/plugins/axios';
import vuetify from '@/plugins/vuetify';
import pinia from '@/store';
import router from '@/router';

// Types
import type { App } from 'vue';

export function registerPlugins(app: App) {
  app.use(axiosPlugin).use(vuetify).use(pinia).use(router);
}
