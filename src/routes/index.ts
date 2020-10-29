import { Router } from 'express';
import UserRouter from './Users';
import AwsRouterV1 from './v1/Aws';
import AwsTerraformRouterV1 from './v1/terraform/Aws';
// Init router and path
const router = Router();

router.use((req, res, next) => {
    const { access_key, secret_key } = req.headers;
    if (typeof access_key === 'string' && !access_key.match(/^[A-Za-z0-9]+$/)) {
        res.status(400).end(JSON.stringify({}));
        return;
    }
    if (typeof secret_key === 'string' && !secret_key.match(/^[A-Za-z0-9]+$/)) {
        res.status(400).end(JSON.stringify({}));
        return;
    }
    next();
});

// Add sub-routes
router.use('/users', UserRouter);
router.use('/v1/aws', AwsRouterV1)
router.use('/v1/terraform', AwsTerraformRouterV1)

// Export the base-router
export default router;
