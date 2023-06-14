import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/HomePage.vue';
import PreviewImg from '@/components/PreviewImg';
import TokenPreview from '@/components/TokenPreview'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/preview',
        name: 'Preview',
        component: PreviewImg
    },
    {
        path: '/token',
        name: 'Token',
        component: TokenPreview
    }
];

const router = createRouter({
    history: createWebHistory(''),
    routes
});

export default router;
