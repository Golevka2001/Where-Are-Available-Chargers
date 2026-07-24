import App from './App.vue';
import { createApp } from 'vue';
import { registerPlugins } from '@/plugins';
import { initWebMcp } from '@/webmcp';
import FloatingVue from 'floating-vue';
import 'vue-scroll-picker/style.css';

const app = createApp(App);
app.use(FloatingVue);

registerPlugins(app);

app.mount('#app');

// Initialize WebMCP for agent discovery
initWebMcp();
