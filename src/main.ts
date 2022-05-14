import { createApp } from 'vue';
import App from '@/App.vue';
import AppLink from '@/components/AppLink.vue'
import router from '@/router';
import store from '@/store';
import 'normalize.css';
import '@/css/base.css';

createApp(App)
    .component('AppLink', AppLink)
    .use(router)
    .use(store)
    .mount('#app');
