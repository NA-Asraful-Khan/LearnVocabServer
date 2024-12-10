import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';

const router = Router();

const moduleRoutes = [
  { path: '/auth', component: AuthRoutes },
  { path: '/users', component: UserRoutes },
];

moduleRoutes.forEach(({ path, component }) => {
  router.use(path, component);
});

export default router;
