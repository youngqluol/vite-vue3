import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/views/home.vue';

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/vetify',
    name: 'vetify',
    component: () => import('@/views/vetify.vue'),
  },
  {
    path: '/element',
    name: 'element',
    component: () => import('@/views/element.vue'),
  },
  {
    path: '/tsxPage',
    name: 'tsxPage',
    component: () => import('@/components/testDemo/TsxDemo.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
