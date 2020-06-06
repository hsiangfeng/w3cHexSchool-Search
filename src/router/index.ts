import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: '',
    component: () => import('../views/Layout.vue'),
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import('../views/Index.vue'),
        meta: {
          title: '全馬鐵人搜尋器首頁',
        },
      },
      {
        path: '/user',
        name: 'User',
        component: () => import('../components/User.vue'),
        meta: {
          title: '全馬鐵人搜尋頁面',
        },
      },
      {
        path: '/save',
        name: 'Save',
        component: () => import('../components/Save.vue'),
        meta: {
          title: '已關注的鐵人',
        },
      },
    ],
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

export default router;
