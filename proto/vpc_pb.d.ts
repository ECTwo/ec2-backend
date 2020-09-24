// package: vpc
// file: vpc.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class Vpc extends jspb.Message { 
    getId(): number;
    setId(value: number): Vpc;

    getSubnet(): Subnet;
    setSubnet(value: Subnet): Vpc;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Vpc.AsObject;
    static toObject(includeInstance: boolean, msg: Vpc): Vpc.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Vpc, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Vpc;
    static deserializeBinaryFromReader(message: Vpc, reader: jspb.BinaryReader): Vpc;
}

export namespace Vpc {
    export type AsObject = {
        id: number,
        subnet: Subnet,
    }
}

export enum Subnet {
    TYPE_1 = 0,
    TYPE_2 = 1,
}
