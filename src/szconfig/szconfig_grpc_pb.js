// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var szconfig_pb = require('./szconfig_pb.js');

function serialize_szconfig_AddDataSourceRequest(arg) {
  if (!(arg instanceof szconfig_pb.AddDataSourceRequest)) {
    throw new Error('Expected argument of type szconfig.AddDataSourceRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_szconfig_AddDataSourceRequest(buffer_arg) {
  return szconfig_pb.AddDataSourceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_szconfig_AddDataSourceResponse(arg) {
  if (!(arg instanceof szconfig_pb.AddDataSourceResponse)) {
    throw new Error('Expected argument of type szconfig.AddDataSourceResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_szconfig_AddDataSourceResponse(buffer_arg) {
  return szconfig_pb.AddDataSourceResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_szconfig_DeleteDataSourceRequest(arg) {
  if (!(arg instanceof szconfig_pb.DeleteDataSourceRequest)) {
    throw new Error('Expected argument of type szconfig.DeleteDataSourceRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_szconfig_DeleteDataSourceRequest(buffer_arg) {
  return szconfig_pb.DeleteDataSourceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_szconfig_DeleteDataSourceResponse(arg) {
  if (!(arg instanceof szconfig_pb.DeleteDataSourceResponse)) {
    throw new Error('Expected argument of type szconfig.DeleteDataSourceResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_szconfig_DeleteDataSourceResponse(buffer_arg) {
  return szconfig_pb.DeleteDataSourceResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_szconfig_GetDataSourcesRequest(arg) {
  if (!(arg instanceof szconfig_pb.GetDataSourcesRequest)) {
    throw new Error('Expected argument of type szconfig.GetDataSourcesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_szconfig_GetDataSourcesRequest(buffer_arg) {
  return szconfig_pb.GetDataSourcesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_szconfig_GetDataSourcesResponse(arg) {
  if (!(arg instanceof szconfig_pb.GetDataSourcesResponse)) {
    throw new Error('Expected argument of type szconfig.GetDataSourcesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_szconfig_GetDataSourcesResponse(buffer_arg) {
  return szconfig_pb.GetDataSourcesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_szconfig_VerifyConfigRequest(arg) {
  if (!(arg instanceof szconfig_pb.VerifyConfigRequest)) {
    throw new Error('Expected argument of type szconfig.VerifyConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_szconfig_VerifyConfigRequest(buffer_arg) {
  return szconfig_pb.VerifyConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_szconfig_VerifyConfigResponse(arg) {
  if (!(arg instanceof szconfig_pb.VerifyConfigResponse)) {
    throw new Error('Expected argument of type szconfig.VerifyConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_szconfig_VerifyConfigResponse(buffer_arg) {
  return szconfig_pb.VerifyConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var SzConfigService = exports.SzConfigService = {
  addDataSource: {
    path: '/szconfig.SzConfig/AddDataSource',
    requestStream: false,
    responseStream: false,
    requestType: szconfig_pb.AddDataSourceRequest,
    responseType: szconfig_pb.AddDataSourceResponse,
    requestSerialize: serialize_szconfig_AddDataSourceRequest,
    requestDeserialize: deserialize_szconfig_AddDataSourceRequest,
    responseSerialize: serialize_szconfig_AddDataSourceResponse,
    responseDeserialize: deserialize_szconfig_AddDataSourceResponse,
  },
  deleteDataSource: {
    path: '/szconfig.SzConfig/DeleteDataSource',
    requestStream: false,
    responseStream: false,
    requestType: szconfig_pb.DeleteDataSourceRequest,
    responseType: szconfig_pb.DeleteDataSourceResponse,
    requestSerialize: serialize_szconfig_DeleteDataSourceRequest,
    requestDeserialize: deserialize_szconfig_DeleteDataSourceRequest,
    responseSerialize: serialize_szconfig_DeleteDataSourceResponse,
    responseDeserialize: deserialize_szconfig_DeleteDataSourceResponse,
  },
  getDataSources: {
    path: '/szconfig.SzConfig/GetDataSources',
    requestStream: false,
    responseStream: false,
    requestType: szconfig_pb.GetDataSourcesRequest,
    responseType: szconfig_pb.GetDataSourcesResponse,
    requestSerialize: serialize_szconfig_GetDataSourcesRequest,
    requestDeserialize: deserialize_szconfig_GetDataSourcesRequest,
    responseSerialize: serialize_szconfig_GetDataSourcesResponse,
    responseDeserialize: deserialize_szconfig_GetDataSourcesResponse,
  },
  verifyConfig: {
    path: '/szconfig.SzConfig/VerifyConfig',
    requestStream: false,
    responseStream: false,
    requestType: szconfig_pb.VerifyConfigRequest,
    responseType: szconfig_pb.VerifyConfigResponse,
    requestSerialize: serialize_szconfig_VerifyConfigRequest,
    requestDeserialize: deserialize_szconfig_VerifyConfigRequest,
    responseSerialize: serialize_szconfig_VerifyConfigResponse,
    responseDeserialize: deserialize_szconfig_VerifyConfigResponse,
  },
};

exports.SzConfigClient = grpc.makeGenericClientConstructor(SzConfigService);
