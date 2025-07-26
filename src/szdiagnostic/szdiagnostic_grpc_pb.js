// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var szdiagnostic_pb = require('./szdiagnostic_pb.js');

function serialize_szdiagnostic_CheckRepositoryPerformanceRequest(arg) {
  if (!(arg instanceof szdiagnostic_pb.CheckRepositoryPerformanceRequest)) {
    throw new Error('Expected argument of type szdiagnostic.CheckRepositoryPerformanceRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_szdiagnostic_CheckRepositoryPerformanceRequest(buffer_arg) {
  return szdiagnostic_pb.CheckRepositoryPerformanceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_szdiagnostic_CheckRepositoryPerformanceResponse(arg) {
  if (!(arg instanceof szdiagnostic_pb.CheckRepositoryPerformanceResponse)) {
    throw new Error('Expected argument of type szdiagnostic.CheckRepositoryPerformanceResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_szdiagnostic_CheckRepositoryPerformanceResponse(buffer_arg) {
  return szdiagnostic_pb.CheckRepositoryPerformanceResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_szdiagnostic_GetFeatureRequest(arg) {
  if (!(arg instanceof szdiagnostic_pb.GetFeatureRequest)) {
    throw new Error('Expected argument of type szdiagnostic.GetFeatureRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_szdiagnostic_GetFeatureRequest(buffer_arg) {
  return szdiagnostic_pb.GetFeatureRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_szdiagnostic_GetFeatureResponse(arg) {
  if (!(arg instanceof szdiagnostic_pb.GetFeatureResponse)) {
    throw new Error('Expected argument of type szdiagnostic.GetFeatureResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_szdiagnostic_GetFeatureResponse(buffer_arg) {
  return szdiagnostic_pb.GetFeatureResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_szdiagnostic_GetRepositoryInfoRequest(arg) {
  if (!(arg instanceof szdiagnostic_pb.GetRepositoryInfoRequest)) {
    throw new Error('Expected argument of type szdiagnostic.GetRepositoryInfoRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_szdiagnostic_GetRepositoryInfoRequest(buffer_arg) {
  return szdiagnostic_pb.GetRepositoryInfoRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_szdiagnostic_GetRepositoryInfoResponse(arg) {
  if (!(arg instanceof szdiagnostic_pb.GetRepositoryInfoResponse)) {
    throw new Error('Expected argument of type szdiagnostic.GetRepositoryInfoResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_szdiagnostic_GetRepositoryInfoResponse(buffer_arg) {
  return szdiagnostic_pb.GetRepositoryInfoResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_szdiagnostic_PurgeRepositoryRequest(arg) {
  if (!(arg instanceof szdiagnostic_pb.PurgeRepositoryRequest)) {
    throw new Error('Expected argument of type szdiagnostic.PurgeRepositoryRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_szdiagnostic_PurgeRepositoryRequest(buffer_arg) {
  return szdiagnostic_pb.PurgeRepositoryRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_szdiagnostic_PurgeRepositoryResponse(arg) {
  if (!(arg instanceof szdiagnostic_pb.PurgeRepositoryResponse)) {
    throw new Error('Expected argument of type szdiagnostic.PurgeRepositoryResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_szdiagnostic_PurgeRepositoryResponse(buffer_arg) {
  return szdiagnostic_pb.PurgeRepositoryResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_szdiagnostic_ReinitializeRequest(arg) {
  if (!(arg instanceof szdiagnostic_pb.ReinitializeRequest)) {
    throw new Error('Expected argument of type szdiagnostic.ReinitializeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_szdiagnostic_ReinitializeRequest(buffer_arg) {
  return szdiagnostic_pb.ReinitializeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_szdiagnostic_ReinitializeResponse(arg) {
  if (!(arg instanceof szdiagnostic_pb.ReinitializeResponse)) {
    throw new Error('Expected argument of type szdiagnostic.ReinitializeResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_szdiagnostic_ReinitializeResponse(buffer_arg) {
  return szdiagnostic_pb.ReinitializeResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var SzDiagnosticService = exports.SzDiagnosticService = {
  checkRepositoryPerformance: {
    path: '/szdiagnostic.SzDiagnostic/CheckRepositoryPerformance',
    requestStream: false,
    responseStream: false,
    requestType: szdiagnostic_pb.CheckRepositoryPerformanceRequest,
    responseType: szdiagnostic_pb.CheckRepositoryPerformanceResponse,
    requestSerialize: serialize_szdiagnostic_CheckRepositoryPerformanceRequest,
    requestDeserialize: deserialize_szdiagnostic_CheckRepositoryPerformanceRequest,
    responseSerialize: serialize_szdiagnostic_CheckRepositoryPerformanceResponse,
    responseDeserialize: deserialize_szdiagnostic_CheckRepositoryPerformanceResponse,
  },
  getFeature: {
    path: '/szdiagnostic.SzDiagnostic/GetFeature',
    requestStream: false,
    responseStream: false,
    requestType: szdiagnostic_pb.GetFeatureRequest,
    responseType: szdiagnostic_pb.GetFeatureResponse,
    requestSerialize: serialize_szdiagnostic_GetFeatureRequest,
    requestDeserialize: deserialize_szdiagnostic_GetFeatureRequest,
    responseSerialize: serialize_szdiagnostic_GetFeatureResponse,
    responseDeserialize: deserialize_szdiagnostic_GetFeatureResponse,
  },
  getRepositoryInfo: {
    path: '/szdiagnostic.SzDiagnostic/GetRepositoryInfo',
    requestStream: false,
    responseStream: false,
    requestType: szdiagnostic_pb.GetRepositoryInfoRequest,
    responseType: szdiagnostic_pb.GetRepositoryInfoResponse,
    requestSerialize: serialize_szdiagnostic_GetRepositoryInfoRequest,
    requestDeserialize: deserialize_szdiagnostic_GetRepositoryInfoRequest,
    responseSerialize: serialize_szdiagnostic_GetRepositoryInfoResponse,
    responseDeserialize: deserialize_szdiagnostic_GetRepositoryInfoResponse,
  },
  purgeRepository: {
    path: '/szdiagnostic.SzDiagnostic/PurgeRepository',
    requestStream: false,
    responseStream: false,
    requestType: szdiagnostic_pb.PurgeRepositoryRequest,
    responseType: szdiagnostic_pb.PurgeRepositoryResponse,
    requestSerialize: serialize_szdiagnostic_PurgeRepositoryRequest,
    requestDeserialize: deserialize_szdiagnostic_PurgeRepositoryRequest,
    responseSerialize: serialize_szdiagnostic_PurgeRepositoryResponse,
    responseDeserialize: deserialize_szdiagnostic_PurgeRepositoryResponse,
  },
  reinitialize: {
    path: '/szdiagnostic.SzDiagnostic/Reinitialize',
    requestStream: false,
    responseStream: false,
    requestType: szdiagnostic_pb.ReinitializeRequest,
    responseType: szdiagnostic_pb.ReinitializeResponse,
    requestSerialize: serialize_szdiagnostic_ReinitializeRequest,
    requestDeserialize: deserialize_szdiagnostic_ReinitializeRequest,
    responseSerialize: serialize_szdiagnostic_ReinitializeResponse,
    responseDeserialize: deserialize_szdiagnostic_ReinitializeResponse,
  },
};

exports.SzDiagnosticClient = grpc.makeGenericClientConstructor(SzDiagnosticService);
