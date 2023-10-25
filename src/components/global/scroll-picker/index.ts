// Copyright: https://github.com/wan2land/vue-scroll-picker/tree/main

import { App, Plugin } from 'vue';

import VueScrollPicker from './scroll-picker';

export function install(app: App) {
  app.component('VueScrollPicker', VueScrollPicker);
}

if (typeof window !== 'undefined' && (window as any).Vue) {
  install((window as any).Vue);
}

const plugin: Plugin = {
  install,
};

export default plugin;

// re-define: https://github.com/vitejs/vite/issues/2117
export interface VueScrollPickerOption {
  name: string;
  value: any;
}

export { VueScrollPicker };
