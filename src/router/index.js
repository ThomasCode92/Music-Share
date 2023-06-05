import { createRouter, createWebHistory } from 'vue-router';

import routes from './routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500',
});

router.beforeEach((to, from, next) => {
  console.log('Global Guard');
  console.log(to, from);

  next();
});

export default router;
