import PromiseType from '@entities/PromiseStatus';
import { Request, Response, Router } from 'express';
import { execShellCommand } from "../../helper/shell";

// Init shared
const router = Router();


router.get('/securitygroups', async (req: Request, res: Response) => {
    const { access_key, secret_key } = req.headers;
    const { region } = req.query

    let ret:PromiseType = await execShellCommand(`docker-compose -f helper/docker-compose.yml run \
    -e AWS_DEFAULT_REGION=${region || 'us-east-1'} \
    -e AWS_ACCESS_KEY_ID=${access_key} \
    -e AWS_SECRET_ACCESS_KEY=${secret_key} \
    --rm aws ec2 describe-security-groups \
    `);
    if (ret.result == 1 || ret.result == 2) {
        return res.status(400).end(ret.message);
    }

    return res.status(200).send(JSON.parse(ret.message));
});


export default router;

