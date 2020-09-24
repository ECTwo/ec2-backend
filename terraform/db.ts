import {Subnet, Vpc} from "../proto/vpc_pb";

export function vpcToClass({id, subnet}: Vpc.AsObject) {
    const vpc = new Vpc();
    vpc.setId(id);
    vpc.setSubnet(subnet);

    return vpc;
} 