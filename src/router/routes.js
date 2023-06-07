import HomePage from '../views/HomePage.vue';
import ManageMusic from '../views/ManageMusic.vue';

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/manage', redirect: { name: 'manage' } },
  {
    path: '/manage-music',
    name: 'manage',
    component: ManageMusic,
    beforeEnter: (to, from, next) => {
      console.log('Manage Route Guard');
      next();
    },
  },
  { path: '/:catchAll(.*)*', redirect: { name: 'home' } },
];

export default routes;
