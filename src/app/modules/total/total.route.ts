import express from 'express';
import { TotalController } from './total.controller';

const router = express.Router();

router.get('/', TotalController.totalValue);

export const TotalRoutes = router;
