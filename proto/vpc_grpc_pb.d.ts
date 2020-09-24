// package: vpc
// file: vpc.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as vpc_pb from "./vpc_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

interface IVpcServicesService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    createVPC: IVpcServicesService_ICreateVPC;
}

interface IVpcServicesService_ICreateVPC extends grpc.MethodDefinition<vpc_pb.Vpc, google_protobuf_empty_pb.Empty> {
    path: "/vpc.VpcServices/CreateVPC";
    requestStream: true;
    responseStream: false;
    requestSerialize: grpc.serialize<vpc_pb.Vpc>;
    requestDeserialize: grpc.deserialize<vpc_pb.Vpc>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}

export const VpcServicesService: IVpcServicesService;

export interface IVpcServicesServer {
    createVPC: grpc.handleClientStreamingCall<vpc_pb.Vpc, google_protobuf_empty_pb.Empty>;
}

export interface IVpcServicesClient {
    createVPC(callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientWritableStream<vpc_pb.Vpc>;
    createVPC(metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientWritableStream<vpc_pb.Vpc>;
    createVPC(options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientWritableStream<vpc_pb.Vpc>;
    createVPC(metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientWritableStream<vpc_pb.Vpc>;
}

export class VpcServicesClient extends grpc.Client implements IVpcServicesClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public createVPC(callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientWritableStream<vpc_pb.Vpc>;
    public createVPC(metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientWritableStream<vpc_pb.Vpc>;
    public createVPC(options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientWritableStream<vpc_pb.Vpc>;
    public createVPC(metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientWritableStream<vpc_pb.Vpc>;
}
