// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var vpc_pb = require('./vpc_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_vpc_Vpc(arg) {
  if (!(arg instanceof vpc_pb.Vpc)) {
    throw new Error('Expected argument of type vpc.Vpc');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_vpc_Vpc(buffer_arg) {
  return vpc_pb.Vpc.deserializeBinary(new Uint8Array(buffer_arg));
}


var VpcServicesService = exports.VpcServicesService = {
  createVPC: {
    path: '/vpc.VpcServices/CreateVPC',
    requestStream: true,
    responseStream: false,
    requestType: vpc_pb.Vpc,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_vpc_Vpc,
    requestDeserialize: deserialize_vpc_Vpc,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
};

exports.VpcServicesClient = grpc.makeGenericClientConstructor(VpcServicesService);
