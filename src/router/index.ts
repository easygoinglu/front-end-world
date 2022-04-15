import { createRouter, createWebHistory } from 'vue-router';
import FrontEndOverview from '@/views/FrontEndOverview.vue';

const routes = [
    { 
        name: 'front-end-overview', 
        path: '/', 
        component: FrontEndOverview, 
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;