import { Construct } from 'constructs';
import { App, TerraformStack, Token } from 'cdktf';
import { AwsProvider } from './.gen/providers/aws';
import { Vpc } from './.gen/providers/aws/vpc';
import { Subnet } from './.gen/providers/aws/subnet';
import {
  ServerUnaryCall,
  sendUnaryData,
  ServiceError,
  ServerWritableStream,
  ServerReadableStream,
} from "grpc";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";

import { IUsersServer } from "../proto/vpcs_grpc_pb";
import { User, UserRequest } from "../proto/vpcs_pb";
import { users } from "./db";



export class CreateVPC extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    new AwsProvider(this, 'aws', {
      region: 'us-east-2' // 파라메터로 변경
    });
 
    const vpc = new Vpc(this, 'my-vpc', {
      cidrBlock: '10.0.0.0/16'
    });

    new Subnet(this, 'my-subnet', {
      vpcId: Token.asString(vpc.id),
      cidrBlock: '10.0.0.0/24'
    });
  }
}

// const app = new App();
//new CreateVPC(app, 'terraform');
 //app.synth();



export class terraformServer implements IVpcServer {

}