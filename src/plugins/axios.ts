import axios from 'axios';
import { App, Plugin } from 'vue';

const axiosPlugin: Plugin = {
  install(app: App) {
    app.config.globalProperties.$axios = axios;
    app.config.globalProperties.$axios.defaults.baseURL =
      process.env.NODE_ENV === 'development'
        ? import.meta.env.VITE_API_URL || '/api'
        : import.meta.env.VITE_API_URL;
  },
};

export default axiosPlugin;
