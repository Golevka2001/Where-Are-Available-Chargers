import { createRouter, createWebHistory } from 'vue-router';

const DefaultLayout = () => import('@/layouts/DefaultLayout.vue');
const AboutPage = () => import('@/views/AboutPage.vue');
const ErrorPage = () => import('@/views/ErrorPage.vue');
const FeedbackPage = () => import('@/views/FeedbackPage.vue');
const MapPage = () => import('@/views/MapPage.vue');
const StatusPage = () => import('@/views/StatusPage.vue');

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    redirect: 'status',
    children: [
      {
        path: 'about',
        name: 'About',
        component: AboutPage,
      },
      {
        path: 'error',
        name: 'Error',
        component: ErrorPage,
      },
      {
        path: 'feedback',
        name: 'Feedback',
        component: FeedbackPage,
      },
      {
        path: 'map',
        name: 'Map',
        component: MapPage,
      },
      {
        path: 'status',
        name: 'Status',
        component: StatusPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;