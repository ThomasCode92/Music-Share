import HomePage from '../views/HomePage.vue';
import ManageMusic from '../views/ManageMusic.vue';
import SongDetails from '../views/SongDetails.vue';

const routes = [
  { path: '/', name: 'home', component: HomePage },
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
