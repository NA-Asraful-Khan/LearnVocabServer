import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { LessonRoutes } from '../modules/lesson/lesson.route';
import { VocabularyRoutes } from '../modules/vocabulary/vocabulary.route';
import { TotalRoutes } from '../modules/total/total.route';

const router = Router();

const moduleRoutes = [
  { path: '/auth', component: AuthRoutes },
  { path: '/users', component: UserRoutes },
  { path: '/lessons', component: LessonRoutes },
  { path: '/vocabulary', component: VocabularyRoutes },
  { path: '/report', component: TotalRoutes },
];

moduleRoutes.forEach(({ path, component }) => {
  router.use(path, component);
});

export default router;
