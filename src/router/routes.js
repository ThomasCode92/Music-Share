const HomePage = () => import('../views/HomePage.vue');
const AboutPage = () => import('../views/AboutPage.vue');
const ManageMusic = () => import('../views/ManageMusic.vue');
const SongDetails = () => import('../views/SongDetails.vue');

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/about', name: 'about', component: AboutPage },
  { path: '/manage', redirect: { name: 'manage' } },
  {
    path: '/manage-music',
    name: 'manage',
    component: ManageMusic,
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      console.log('Manage Route Guard');
      next();
    },
  },
  { path: '/song/:id', name: 'song', component: SongDetails },
  { path: '/:catchAll(.*)*', redirect: { name: 'home' } },
];

export default routes;
