import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    redirect: 'status',
    children: [
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/AboutPage.vue'),
      },
      {
        path: 'error',
        name: 'Error',
        component: () => import('@/views/ErrorPage.vue'),
      },
      {
        path: 'feedback',
        name: 'Feedback',
        component: () => import('@/views/FeedbackPage.vue'),
      },
      {
        path: 'map',
        name: 'Map',
        component: () => import('@/views/MapPage.vue'),
      },
      {
        path: 'status',
        name: 'Status',
        component: () => import('@/views/StatusPage.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
