import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';

const router = Router();

const moduleRoutes = [{ path: '/users', component: UserRoutes }];

moduleRoutes.forEach(({ path, component }) => {
  router.use(path, component);
});

export default router;
