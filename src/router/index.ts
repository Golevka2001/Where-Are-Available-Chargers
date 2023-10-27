import { createRouter, createWebHistory } from 'vue-router';

const DefaultLayout = () => import('@/layouts/DefaultLayout.vue');

const AboutPage = () => import('@/views/AboutPage.vue');
const ChallengePage = () => import('@/views/ChallengePage.vue');
const ErrorPage = () => import('@/views/ErrorPage.vue');
const FeedbackPage = () => import('@/views/FeedbackPage.vue');
const IllustrationPage = () => import('@/views/IllustrationPage.vue');
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
        path: 'challenge',
        name: 'Challenge',
        component: ChallengePage,
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
        path: 'illustration',
        name: 'Illustration',
        component: IllustrationPage,
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
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      top: 0,
      behavior: 'smooth',
    };
  },
});

export default router;
