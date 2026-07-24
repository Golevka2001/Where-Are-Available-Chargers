import axios from 'axios';
import { App, Plugin } from 'vue';
import config from '@/config';

const axiosPlugin: Plugin = {
  install(app: App) {
    app.config.globalProperties.$axios = axios;
    app.config.globalProperties.$axios.defaults.baseURL = config.apiBaseUrl;
  },
};

export default axiosPlugin;
