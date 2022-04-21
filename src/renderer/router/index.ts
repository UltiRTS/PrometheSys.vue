import {createRouter, createMemoryHistory} from 'vue-router';

const routes = [
    {path: '/', component: () => import('../views/Prelogin.vue')},
    {path: '/Login', component: () => import('../views/Login.vue')},
] 

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

export default router