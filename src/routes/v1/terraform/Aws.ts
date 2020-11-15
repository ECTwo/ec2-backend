import { Request, Response, Router } from 'express';
import PromiseType from '@entities/PromiseStatus';
import { execShellCommand } from "../../../helper/shell";
import logger from '@shared/Logger';
const fs = require('fs');

const router = Router();

router.post('/:user', async (req: Request, res: Response) => {
    // get data
    const publicData = {
        server: [{
          name: "ec2_public_1",
          cpu: 0,
          ram: 0,
          os: "t3.micro"
        },
        {
          name: "ec2_public_2",
          cpu: 0,
          ram: 0,
          os: "t3.micro"
        } 
    ]}
    const privateData = {
        server: [{
          name: "ec2_private_1",
          cpu: 0,
          ram: 0,
          os: "t3.micro"
        },
        {
          name: "ec2_private_2",
          cpu: 0,
          ram: 0,
          os: "t3.micro"
        },
    ]}
    const dbData = {
        server: [{
          name: "bobdb",
          lgType: "mysql",
          masterID: "bobmasterid",
          masterPW: "%bobmasterpassword1234%"
        },
    ]}

    // dataset

    const user = req.params.user;
    const { access_key, secret_key } = req.headers;
    req.setTimeout(1000 * 1 * 60 * 5)
    
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
                            -var "public_cnt=${publicData.server.length}" \
                            -var "private_cnt=${privateData.server.length}" \
                            ${process.env.SRC}/terraform/arch/bob/only_ec2`)

    fs.readFile(`${process.env.SRC}/../terraform.tfstate.d/${user}_arch/terraform.tfstate`, (err, data) => {
      if (err) return res.status(200).end();
  
      return res.status(200).send(JSON.parse(data));
    });
})

router.get('/:user', async (req: Request, res: Response) => {
    const user = req.params.user;
    const workspace = req.query.workspace;

    logger.info(`input value = ${user}, ${workspace}`);

    var zip = require('express-zip');

    var json_path = `${process.env.SRC}/../terraform.tfstate.d/${user}_arch/terraform.tfstate`; //json data file path
    const dataBuffer = fs.readFileSync(json_path);
    const dataJSON = dataBuffer.toString();
    const data = JSON.parse(dataJSON);

    function PEMGEN(file_path, key_name, templete){
        var fs = require('fs');
        const dataBuffer = fs.readFileSync(file_path);
        const dataJSON = dataBuffer.toString();
        const data = JSON.parse(dataJSON);
    
        fs.writeFile(key_name, templete, function(err){
            if (err === null) { 
                console.log(`${key_name} file made success.`);
                fs.chmod(key_name, 0o775, (err) => {
                    if (err) { console.log(err); }
                    else console.log(`The permissions for ${key_name} have been changed!`);
                });
            }
            else console.log(err);
        });
    }

    //make pem file
    PEMGEN(json_path, `./${user}_${data.outputs.public_key.name}.pem`, `${data.outputs.public_key.key}`);
    for (var i = 0; i<data.outputs.private_key.length; i++) {
        PEMGEN(json_path, `./${user}_${data.outputs.private_key[i].name}.pem`, `${data.outputs.private_key[i].key}`);
    }

    var keyArr = [{ path: `./${user}_${data.outputs.public_key.name}.pem`, name: `${data.outputs.public_key.name}.pem` }, ];
    for (var i = 0; i<data.outputs.private_key.length; i++) {
        keyArr.push({ path: `./${user}_${data.outputs.private_key[i].name}.pem`, name: `${data.outputs.private_key[i].name}.pem` });
    }

    res.zip(keyArr); //zip name: attachment.zip

    return res.status(200).end();
});


router.delete('/:user', async (req: Request, res: Response) => {
    const { access_key, secret_key } = req.headers;
    const user = req.params.user;
    req.setTimeout(1000 * 1 * 60 * 5)

    logger.info('start to delete ' + user)
    await execShellCommand(`terraform workspace select ${user}_arch`);
    let ret:PromiseType = await execShellCommand(`terraform destroy -auto-approve \
            -var "access_key=${access_key}" \
            -var "secret_key=${secret_key}" \
            -var "region=us-east-2" \
            ${process.env.SRC}/terraform/arch/bob/only_ec2`);

    if (ret.result == 1 || ret.result == 2) {
        return res.status(400).end(ret.message);
    }

    return res.status(201).send(JSON.parse(ret.message));
});

export default router;
