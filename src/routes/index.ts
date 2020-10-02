import { Router } from 'express';
import UserRouter from './Users';
import AwsRouterV1 from './v1/Aws';
// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/v1/aws', AwsRouterV1)

// Export the base-router
export default router;
