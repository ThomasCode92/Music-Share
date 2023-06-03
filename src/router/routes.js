import AppHome from '../views/AppHome.vue';
import AppManage from '../views/AppManage.vue';

const routes = [
  { path: '/', name: 'home', component: AppHome },
  { path: '/manage', name: 'manage', component: AppManage },
];

export default routes;
