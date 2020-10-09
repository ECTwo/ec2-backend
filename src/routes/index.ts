import { Router } from 'express';
import UserRouter from './Users';
import AwsRouterV1 from './v1/Aws';
import AwsTerraformRouterV1 from './v1/terraform/Aws';
// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/v1/aws', AwsRouterV1)
router.use('/v1/terraform', AwsTerraformRouterV1)

// Export the base-router
export default router;
