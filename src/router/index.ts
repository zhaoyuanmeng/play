import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    meta: {
      title: '首页',
      keepAlive: true,
      requireAuth: true,
    },
    component: () => import('@/pages/index.vue'),
  },
  {
    path: '/canvas',
    name: 'Canvas',
    meta: {
      title: '表',
    },
    component: () => import('@/pages/canvas.vue'),
  },
  {
    path: '/gua',
    name: 'Gua',
    meta: {
      title: '刮刮卡',
    },
    component: () => import('@/pages/guaguaka.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
