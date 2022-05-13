import { createApp } from 'vue';
import App from '@/App.vue';
import AppLink from '@/components/AppLink.vue'
import router from '@/router';
import 'normalize.css';

createApp(App)
    .component('AppLink', AppLink)
    .use(router)
    .mount('#app');
