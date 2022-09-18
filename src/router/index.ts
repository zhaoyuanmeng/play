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
  {
    path: '/t1',
    name: 'Test1',
    meta: {
      title: '页面1',
    },
    component: () => import('@/pages/t1.vue'),
  },
  {
    path: '/t2',
    name: 'Test2',
    meta: {
      title: '页面22',
    },
    component: () => import('@/pages/t2.vue'),
  },
  {
    path: '/c1',
    name: 'C1',
    meta: {
      title: 'canvass',
    },
    component: () => import('@/pages/c1.vue'),
  },
  {
    path: '/excelImp',
    name: 'excelImp',
    meta: {
      title: 'excelImp',
    },
    component: () => import('@/pages/excelImport.vue'),
  },
  {
    path: '/excelExp',
    name: 'excelExp',
    meta: {
      title: 'excelExp',
    },
    component: () => import('@/pages/excelExport.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
