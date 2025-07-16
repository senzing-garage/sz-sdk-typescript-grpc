// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var szconfig_pb = require('./szconfig_pb.js');

function serialize_szconfig_GetDataSourceRegistryRequest(arg) {
  if (!(arg instanceof szconfig_pb.GetDataSourceRegistryRequest)) {
    throw new Error('Expected argument of type szconfig.GetDataSourceRegistryRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_szconfig_GetDataSourceRegistryRequest(buffer_arg) {
  return szconfig_pb.GetDataSourceRegistryRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_szconfig_GetDataSourceRegistryResponse(arg) {
  if (!(arg instanceof szconfig_pb.GetDataSourceRegistryResponse)) {
    throw new Error('Expected argument of type szconfig.GetDataSourceRegistryResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_szconfig_GetDataSourceRegistryResponse(buffer_arg) {
  return szconfig_pb.GetDataSourceRegistryResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_szconfig_RegisterDataSourceRequest(arg) {
  if (!(arg instanceof szconfig_pb.RegisterDataSourceRequest)) {
    throw new Error('Expected argument of type szconfig.RegisterDataSourceRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_szconfig_RegisterDataSourceRequest(buffer_arg) {
  return szconfig_pb.RegisterDataSourceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_szconfig_RegisterDataSourceResponse(arg) {
  if (!(arg instanceof szconfig_pb.RegisterDataSourceResponse)) {
    throw new Error('Expected argument of type szconfig.RegisterDataSourceResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_szconfig_RegisterDataSourceResponse(buffer_arg) {
  return szconfig_pb.RegisterDataSourceResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_szconfig_UnregisterDataSourceRequest(arg) {
  if (!(arg instanceof szconfig_pb.UnregisterDataSourceRequest)) {
    throw new Error('Expected argument of type szconfig.UnregisterDataSourceRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_szconfig_UnregisterDataSourceRequest(buffer_arg) {
  return szconfig_pb.UnregisterDataSourceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_szconfig_UnregisterDataSourceResponse(arg) {
  if (!(arg instanceof szconfig_pb.UnregisterDataSourceResponse)) {
    throw new Error('Expected argument of type szconfig.UnregisterDataSourceResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_szconfig_UnregisterDataSourceResponse(buffer_arg) {
  return szconfig_pb.UnregisterDataSourceResponse.deserializeBinary(new Uint8Array(buffer_arg));
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
  getDataSourceRegistry: {
    path: '/szconfig.SzConfig/GetDataSourceRegistry',
    requestStream: false,
    responseStream: false,
    requestType: szconfig_pb.GetDataSourceRegistryRequest,
    responseType: szconfig_pb.GetDataSourceRegistryResponse,
    requestSerialize: serialize_szconfig_GetDataSourceRegistryRequest,
    requestDeserialize: deserialize_szconfig_GetDataSourceRegistryRequest,
    responseSerialize: serialize_szconfig_GetDataSourceRegistryResponse,
    responseDeserialize: deserialize_szconfig_GetDataSourceRegistryResponse,
  },
  registerDataSource: {
    path: '/szconfig.SzConfig/RegisterDataSource',
    requestStream: false,
    responseStream: false,
    requestType: szconfig_pb.RegisterDataSourceRequest,
    responseType: szconfig_pb.RegisterDataSourceResponse,
    requestSerialize: serialize_szconfig_RegisterDataSourceRequest,
    requestDeserialize: deserialize_szconfig_RegisterDataSourceRequest,
    responseSerialize: serialize_szconfig_RegisterDataSourceResponse,
    responseDeserialize: deserialize_szconfig_RegisterDataSourceResponse,
  },
  unregisterDataSource: {
    path: '/szconfig.SzConfig/UnregisterDataSource',
    requestStream: false,
    responseStream: false,
    requestType: szconfig_pb.UnregisterDataSourceRequest,
    responseType: szconfig_pb.UnregisterDataSourceResponse,
    requestSerialize: serialize_szconfig_UnregisterDataSourceRequest,
    requestDeserialize: deserialize_szconfig_UnregisterDataSourceRequest,
    responseSerialize: serialize_szconfig_UnregisterDataSourceResponse,
    responseDeserialize: deserialize_szconfig_UnregisterDataSourceResponse,
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
