import axios from 'axios';
import { App, Plugin } from 'vue';

const axiosPlugin: Plugin = {
  install(app: App) {
    app.config.globalProperties.$axios = axios;
    // TODO：后端接口暂未确定，先不配置 baseURL
  },
};

export default axiosPlugin;
