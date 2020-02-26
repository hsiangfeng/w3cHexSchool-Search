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
      },
      {
        path: '/user',
        name: 'User',
        component: () => import('../components/User.vue'),
      },
    ],
  },
  {
    path: '/save',
    name: 'Save',
    component: () => import('../views/Save.vue'),
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

export default router;
