// 样式文件
import 'viewerjs/dist/viewer.css';

import { Plugin } from 'vue';
import VueViewer from 'v-viewer';

// 避免可能的命名冲突，在组件中使用名称 `v-vue-viewer`
const VueViewerPlugin: Plugin = {
  install(app) {
    app.use(VueViewer, {
      name: 'vue-viewer',
      defaultOptions: {
        zIndex: 9999,
      },
    });
  },
};

export default VueViewerPlugin;
