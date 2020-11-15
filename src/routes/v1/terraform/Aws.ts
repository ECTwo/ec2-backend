import { Request, Response, Router } from 'express';
import PromiseType from '@entities/PromiseStatus';
import { execShellCommand } from "../../../helper/shell";
import logger from '@shared/Logger';
const fs = require('fs');

const router = Router();

router.post('/:user', async (req: Request, res: Response) => {
    const user = req.params.user;
    const { access_key, secret_key } = req.headers;
    const body = req.body

    req.setTimeout(1000 * 1 * 60 * 5)

    body['publicData'].key = `${user}::public::key`
    for (let x of body['privateData']['server']) {
      x.key = x.name.concat('::key')
    }
    
    let data = JSON.stringify(body);
    fs.writeFileSync(`${process.env.SRC}/${user}_data.json`, data);
    
    // ws의 결과, 이미 존재하는 workspace라면 workspace를 수행하지 않습니다
    // issue #
    try {
      await execShellCommand(`terraform workspace new ${user}_arch`);
      await execShellCommand(`terraform init ${process.env.SRC}/terraform/arch/bob/only_ec2`);
    }
    catch(error) {
      logger.info(error)
    }
    
    logger.info(`${process.env.SRC}`)
    

    await execShellCommand(`terraform apply -auto-approve \
                            -var "region=us-east-2" \
                            -var "access_key=${access_key}" \
                            -var "secret_key=${secret_key}" \
                            -var "src=${process.env.SRC}/${user}_data.json" \
                            ${process.env.SRC}/terraform/arch/bob/only_ec2`)

    fs.readFile(`${process.env.SRC}/../terraform.tfstate.d/${user}_arch/terraform.tfstate`, (err, data) => {
      if (err) return res.status(404).end();
  
      return res.status(200).send(JSON.parse(data));
    });
})

router.get('/:user', async (req: Request, res: Response) => {
    const user = req.params.user;
    const workspace = req.query.workspace;

    logger.info(`input value = ${user}, ${workspace}`);

    return res.status(200).send({"hello" : "world"});
});


router.delete('/:user', async (req: Request, res: Response) => {
    const { access_key, secret_key } = req.headers;
    const user = req.params.user;
    req.setTimeout(1000 * 1 * 60 * 5)

    logger.info('start to del1ete ' + user)

    try {
      await execShellCommand(`terraform destroy -auto-approve \
      -var "region=us-east-2" \
      -var "access_key=${access_key}" \
      -var "secret_key=${secret_key}" \
      -var "src=${process.env.SRC}/${user}_data.json" \
      -state=${process.env.SRC}/../terraform.tfstate.d/${user}_arch/terraform.tfstate \
      ${process.env.SRC}/terraform/arch/bob/only_ec2`)
   
    }
    catch(error) {
      logger.info(error)
      return res.status(404).end();
    }
  

    return res.status(200).end();
});

export default router;
