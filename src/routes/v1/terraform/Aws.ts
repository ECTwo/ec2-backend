import { Request, Response, Router } from 'express';
import PromiseType from '@entities/PromiseStatus';
import { execShellCommand } from "../../../helper/shell";
import logger from '@shared/Logger';
const router = Router();

router.get('/:user', async (req: Request, res: Response) => {
    const user = req.params.user;
    const workspace = req.query.workspace;
    const backdoor = req.headers.bob;

    if(backdoor !== 'bobec2') {
      return res.status(401).end();  
    }

    logger.info(`input value = ${user}, ${workspace}`);

    return res.status(200).end();
});

export default router;
