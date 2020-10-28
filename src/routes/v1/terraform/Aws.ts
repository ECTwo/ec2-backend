import { Request, Response, Router } from 'express';
import PromiseType from '@entities/PromiseStatus';
import { execShellCommand } from "../../../helper/shell";
import logger from '@shared/Logger';
const router = Router();

router.get('/:user', async (req: Request, res: Response) => {
    const user = req.params.user;
    const workspace = req.query.workspace;

    logger.info(`input value = ${user}, ${workspace}`);

    return res.status(200).end();
});

router.post('/arch/crud', async (req: Request, res: Response) => {
    const { region, subnet, cidr_block, access_key, secret_key } = req.body;
    let ret:PromiseType = await execShellCommand(`docker-compose -f helper/docker-compose.yml run \
    --rm tf apply -auto-approve \
    -var "region=${region}" \
    -var "cidr_block=${cidr_block}" \
    -var "subnet=${subnet}" \
    -var "access_key=${access_key}" \
    -var "secret_key=${secret_key}"
    `);

    if (ret.result == 1 || ret.result == 2) {
        return res.status(400).end(ret.message);
    }

    return res.status(201).send(JSON.parse(ret.message));
})

router.delete('/arch/crud', async (req: Request, res: Response) => {
    const { access_key, secret_key } = req.body;
    
    let ret:PromiseType = await execShellCommand(`docker-compose -f helper/docker-compose.yml run \
            --rm tf destroy -auto-approve \
            -var "access_key=${access_key}" \
            -var "secret_key=${secret_key}"
    `);

    if (ret.result == 1 || ret.result == 2) {
        return res.status(400).end(ret.message);
    }

    return res.status(201).send(JSON.parse(ret.message));
});

export default router;
