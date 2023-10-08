import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/Default.vue'),
    children: [
      {
        path: '',
        name: 'Status',
        component: () => import('@/views/StatusPage.vue'),
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/AboutPage.vue'),
      },
      {
        path: 'map',
        name: 'Map',
        component: () => import('@/views/MapPage.vue'),
      },
    ],
  },
  {
    path: '/feedback',
    component: () => import('@/layouts/NoFooter.vue'),
    children: [
      {
        path: '',
        name: 'Feedback',
        component: () => import('@/views/FeedbackPage.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
