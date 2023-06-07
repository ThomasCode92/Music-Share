import AppHome from '../views/AppHome.vue';
import AppManage from '../views/AppManage.vue';

const routes = [
  { path: '/', name: 'home', component: AppHome },
  { path: '/manage', redirect: { name: 'manage' } },
  {
    path: '/manage-music',
    name: 'manage',
    component: AppManage,
    beforeEnter: (to, from, next) => {
      console.log('Manage Route Guard');
      next();
    },
  },
  { path: '/:catchAll(.*)*', redirect: { name: 'home' } },
];

export default routes;
