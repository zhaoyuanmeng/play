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
    path: '/leaflet',
    name: 'Ceaflet',
    meta: {
      title: 'leaflet',
      keepAlive: false,
    },
    component: () => import('@/pages/leaflet.vue'),
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
    path: '/qjt',
    name: 'Qjt',
    meta: {
      title: '全景图',
    },
    component: () => import('@/pages/qjt/index.vue'),
  },
  {
    path: '/qjt2',
    name: 'Qjt2',
    meta: {
      title: '全景图2',
    },
    component: () => import('@/pages/qjt/index2.vue'),
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
    path: '/daping',
    name: 'daping',
    meta: {
      title: 'daping',
    },
    component: () => import('@/pages/daping/index.vue'),
  },
  {
    path: '/d360',
    name: 'd360',
    meta: {
      title: 'd360',
    },
    component: () => import('@/pages/test/views/d360.vue'),
  },
  {
    path: '/d361',
    name: 'd361',
    meta: {
      title: 'd361',
    },
    component: () => import('@/pages/test/views/d361.vue'),
  },
  {
    path: '/d720',
    name: 'd720',
    meta: {
      title: 'd720',
    },
    component: () => import('@/pages/test/views/d720.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
