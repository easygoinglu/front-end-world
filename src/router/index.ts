import { createRouter, createWebHistory } from 'vue-router';
import FrontEndOverview from '@/views/FrontEndOverview.vue';

const routes = [
    { 
        name: 'front-end-overview', 
        path: '/', 
        component: FrontEndOverview, 
    },
    { 
        name: 'self-evaluation', 
        path: '/self-evaluation', 
        component: () => import('@/views/SelfEvaluation.vue'), 
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { 
            top: 0, 
        };
    },
});

export default router;