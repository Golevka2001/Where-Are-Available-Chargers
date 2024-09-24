import App from './App.vue';
import { createApp } from 'vue';
import { registerPlugins } from '@/plugins';
import FloatingVue from 'floating-vue';

const app = createApp(App);
app.use(FloatingVue);

registerPlugins(app);

app.mount('#app');
