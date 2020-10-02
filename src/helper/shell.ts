import PromiseType, { promiseStatus } from '@entities/PromiseStatus';

async function execShellCommand(cmd:string):Promise<PromiseType> {
    const exec = require('child_process').exec;
    return new Promise((resolve, reject) => {
     exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.log(error)
        reject(new PromiseType(promiseStatus.FATAL, error));
      }
      if (stdout) {
        console.log(stdout)
        resolve(new PromiseType(promiseStatus.OK, stdout))
      }
      if (stderr) {
        console.log(stderr)
        reject(new PromiseType(promiseStatus.ERROR, stderr))
      }
     });
    });
}

export {execShellCommand};