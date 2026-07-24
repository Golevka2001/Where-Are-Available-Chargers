import { createRouter, createWebHistory } from 'vue-router';

const DefaultLayout = () => import('@/layouts/DefaultLayout.vue');

const AboutPage = () => import('@/views/AboutPage.vue');
const DocsPage = () => import('@/views/DocsPage.vue');
const ErrorPage = () => import('@/views/ErrorPage.vue');
const FeedbackPage = () => import('@/views/FeedbackPage.vue');
const MapPage = () => import('@/views/MapPage.vue');
const StatusPage = () => import('@/views/StatusPage.vue');
const HistoryPage = () => import('@/views/HistoryPage.vue');

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
        path: 'docs',
        name: 'Docs',
        component: DocsPage,
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
        path: 'history',
        name: 'History',
        component: HistoryPage,
      },
      {
        path: 'map/:stationName',
        name: 'Map',
        component: MapPage,
        props: true,
      },
      {
        path: 'status',
        name: 'Status',
        component: StatusPage,
      },
      {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: ErrorPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return {
      top: 0,
      behavior: 'smooth',
    };
  },
});

export default router;
