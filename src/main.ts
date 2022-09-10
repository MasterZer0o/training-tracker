import { createApp } from 'vue';
import App from './App.vue';
import errorHandler from './composables/errorHandler';
const app = createApp(App);
app.config.errorHandler = errorHandler;
app.mount('#app');
