// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var szconfigmanager_pb = require('./szconfigmanager_pb.js');

function serialize_szconfigmanager_GetConfigRegistryRequest(arg) {
  if (!(arg instanceof szconfigmanager_pb.GetConfigRegistryRequest)) {
    throw new Error('Expected argument of type szconfigmanager.GetConfigRegistryRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_szconfigmanager_GetConfigRegistryRequest(buffer_arg) {
  return szconfigmanager_pb.GetConfigRegistryRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_szconfigmanager_GetConfigRegistryResponse(arg) {
  if (!(arg instanceof szconfigmanager_pb.GetConfigRegistryResponse)) {
    throw new Error('Expected argument of type szconfigmanager.GetConfigRegistryResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_szconfigmanager_GetConfigRegistryResponse(buffer_arg) {
  return szconfigmanager_pb.GetConfigRegistryResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_szconfigmanager_GetConfigRequest(arg) {
  if (!(arg instanceof szconfigmanager_pb.GetConfigRequest)) {
    throw new Error('Expected argument of type szconfigmanager.GetConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_szconfigmanager_GetConfigRequest(buffer_arg) {
  return szconfigmanager_pb.GetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_szconfigmanager_GetConfigResponse(arg) {
  if (!(arg instanceof szconfigmanager_pb.GetConfigResponse)) {
    throw new Error('Expected argument of type szconfigmanager.GetConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_szconfigmanager_GetConfigResponse(buffer_arg) {
  return szconfigmanager_pb.GetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_szconfigmanager_GetDefaultConfigIdRequest(arg) {
  if (!(arg instanceof szconfigmanager_pb.GetDefaultConfigIdRequest)) {
    throw new Error('Expected argument of type szconfigmanager.GetDefaultConfigIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_szconfigmanager_GetDefaultConfigIdRequest(buffer_arg) {
  return szconfigmanager_pb.GetDefaultConfigIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_szconfigmanager_GetDefaultConfigIdResponse(arg) {
  if (!(arg instanceof szconfigmanager_pb.GetDefaultConfigIdResponse)) {
    throw new Error('Expected argument of type szconfigmanager.GetDefaultConfigIdResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_szconfigmanager_GetDefaultConfigIdResponse(buffer_arg) {
  return szconfigmanager_pb.GetDefaultConfigIdResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_szconfigmanager_GetTemplateConfigRequest(arg) {
  if (!(arg instanceof szconfigmanager_pb.GetTemplateConfigRequest)) {
    throw new Error('Expected argument of type szconfigmanager.GetTemplateConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_szconfigmanager_GetTemplateConfigRequest(buffer_arg) {
  return szconfigmanager_pb.GetTemplateConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_szconfigmanager_GetTemplateConfigResponse(arg) {
  if (!(arg instanceof szconfigmanager_pb.GetTemplateConfigResponse)) {
    throw new Error('Expected argument of type szconfigmanager.GetTemplateConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_szconfigmanager_GetTemplateConfigResponse(buffer_arg) {
  return szconfigmanager_pb.GetTemplateConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_szconfigmanager_RegisterConfigRequest(arg) {
  if (!(arg instanceof szconfigmanager_pb.RegisterConfigRequest)) {
    throw new Error('Expected argument of type szconfigmanager.RegisterConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_szconfigmanager_RegisterConfigRequest(buffer_arg) {
  return szconfigmanager_pb.RegisterConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_szconfigmanager_RegisterConfigResponse(arg) {
  if (!(arg instanceof szconfigmanager_pb.RegisterConfigResponse)) {
    throw new Error('Expected argument of type szconfigmanager.RegisterConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_szconfigmanager_RegisterConfigResponse(buffer_arg) {
  return szconfigmanager_pb.RegisterConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_szconfigmanager_ReplaceDefaultConfigIdRequest(arg) {
  if (!(arg instanceof szconfigmanager_pb.ReplaceDefaultConfigIdRequest)) {
    throw new Error('Expected argument of type szconfigmanager.ReplaceDefaultConfigIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_szconfigmanager_ReplaceDefaultConfigIdRequest(buffer_arg) {
  return szconfigmanager_pb.ReplaceDefaultConfigIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_szconfigmanager_ReplaceDefaultConfigIdResponse(arg) {
  if (!(arg instanceof szconfigmanager_pb.ReplaceDefaultConfigIdResponse)) {
    throw new Error('Expected argument of type szconfigmanager.ReplaceDefaultConfigIdResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_szconfigmanager_ReplaceDefaultConfigIdResponse(buffer_arg) {
  return szconfigmanager_pb.ReplaceDefaultConfigIdResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_szconfigmanager_SetDefaultConfigIdRequest(arg) {
  if (!(arg instanceof szconfigmanager_pb.SetDefaultConfigIdRequest)) {
    throw new Error('Expected argument of type szconfigmanager.SetDefaultConfigIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_szconfigmanager_SetDefaultConfigIdRequest(buffer_arg) {
  return szconfigmanager_pb.SetDefaultConfigIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_szconfigmanager_SetDefaultConfigIdResponse(arg) {
  if (!(arg instanceof szconfigmanager_pb.SetDefaultConfigIdResponse)) {
    throw new Error('Expected argument of type szconfigmanager.SetDefaultConfigIdResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_szconfigmanager_SetDefaultConfigIdResponse(buffer_arg) {
  return szconfigmanager_pb.SetDefaultConfigIdResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_szconfigmanager_SetDefaultConfigRequest(arg) {
  if (!(arg instanceof szconfigmanager_pb.SetDefaultConfigRequest)) {
    throw new Error('Expected argument of type szconfigmanager.SetDefaultConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_szconfigmanager_SetDefaultConfigRequest(buffer_arg) {
  return szconfigmanager_pb.SetDefaultConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_szconfigmanager_SetDefaultConfigResponse(arg) {
  if (!(arg instanceof szconfigmanager_pb.SetDefaultConfigResponse)) {
    throw new Error('Expected argument of type szconfigmanager.SetDefaultConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_szconfigmanager_SetDefaultConfigResponse(buffer_arg) {
  return szconfigmanager_pb.SetDefaultConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var SzConfigManagerService = exports.SzConfigManagerService = {
  getConfig: {
    path: '/szconfigmanager.SzConfigManager/GetConfig',
    requestStream: false,
    responseStream: false,
    requestType: szconfigmanager_pb.GetConfigRequest,
    responseType: szconfigmanager_pb.GetConfigResponse,
    requestSerialize: serialize_szconfigmanager_GetConfigRequest,
    requestDeserialize: deserialize_szconfigmanager_GetConfigRequest,
    responseSerialize: serialize_szconfigmanager_GetConfigResponse,
    responseDeserialize: deserialize_szconfigmanager_GetConfigResponse,
  },
  getConfigRegistry: {
    path: '/szconfigmanager.SzConfigManager/GetConfigRegistry',
    requestStream: false,
    responseStream: false,
    requestType: szconfigmanager_pb.GetConfigRegistryRequest,
    responseType: szconfigmanager_pb.GetConfigRegistryResponse,
    requestSerialize: serialize_szconfigmanager_GetConfigRegistryRequest,
    requestDeserialize: deserialize_szconfigmanager_GetConfigRegistryRequest,
    responseSerialize: serialize_szconfigmanager_GetConfigRegistryResponse,
    responseDeserialize: deserialize_szconfigmanager_GetConfigRegistryResponse,
  },
  getDefaultConfigId: {
    path: '/szconfigmanager.SzConfigManager/GetDefaultConfigId',
    requestStream: false,
    responseStream: false,
    requestType: szconfigmanager_pb.GetDefaultConfigIdRequest,
    responseType: szconfigmanager_pb.GetDefaultConfigIdResponse,
    requestSerialize: serialize_szconfigmanager_GetDefaultConfigIdRequest,
    requestDeserialize: deserialize_szconfigmanager_GetDefaultConfigIdRequest,
    responseSerialize: serialize_szconfigmanager_GetDefaultConfigIdResponse,
    responseDeserialize: deserialize_szconfigmanager_GetDefaultConfigIdResponse,
  },
  getTemplateConfig: {
    path: '/szconfigmanager.SzConfigManager/GetTemplateConfig',
    requestStream: false,
    responseStream: false,
    requestType: szconfigmanager_pb.GetTemplateConfigRequest,
    responseType: szconfigmanager_pb.GetTemplateConfigResponse,
    requestSerialize: serialize_szconfigmanager_GetTemplateConfigRequest,
    requestDeserialize: deserialize_szconfigmanager_GetTemplateConfigRequest,
    responseSerialize: serialize_szconfigmanager_GetTemplateConfigResponse,
    responseDeserialize: deserialize_szconfigmanager_GetTemplateConfigResponse,
  },
  registerConfig: {
    path: '/szconfigmanager.SzConfigManager/RegisterConfig',
    requestStream: false,
    responseStream: false,
    requestType: szconfigmanager_pb.RegisterConfigRequest,
    responseType: szconfigmanager_pb.RegisterConfigResponse,
    requestSerialize: serialize_szconfigmanager_RegisterConfigRequest,
    requestDeserialize: deserialize_szconfigmanager_RegisterConfigRequest,
    responseSerialize: serialize_szconfigmanager_RegisterConfigResponse,
    responseDeserialize: deserialize_szconfigmanager_RegisterConfigResponse,
  },
  replaceDefaultConfigId: {
    path: '/szconfigmanager.SzConfigManager/ReplaceDefaultConfigId',
    requestStream: false,
    responseStream: false,
    requestType: szconfigmanager_pb.ReplaceDefaultConfigIdRequest,
    responseType: szconfigmanager_pb.ReplaceDefaultConfigIdResponse,
    requestSerialize: serialize_szconfigmanager_ReplaceDefaultConfigIdRequest,
    requestDeserialize: deserialize_szconfigmanager_ReplaceDefaultConfigIdRequest,
    responseSerialize: serialize_szconfigmanager_ReplaceDefaultConfigIdResponse,
    responseDeserialize: deserialize_szconfigmanager_ReplaceDefaultConfigIdResponse,
  },
  setDefaultConfig: {
    path: '/szconfigmanager.SzConfigManager/SetDefaultConfig',
    requestStream: false,
    responseStream: false,
    requestType: szconfigmanager_pb.SetDefaultConfigRequest,
    responseType: szconfigmanager_pb.SetDefaultConfigResponse,
    requestSerialize: serialize_szconfigmanager_SetDefaultConfigRequest,
    requestDeserialize: deserialize_szconfigmanager_SetDefaultConfigRequest,
    responseSerialize: serialize_szconfigmanager_SetDefaultConfigResponse,
    responseDeserialize: deserialize_szconfigmanager_SetDefaultConfigResponse,
  },
  setDefaultConfigId: {
    path: '/szconfigmanager.SzConfigManager/SetDefaultConfigId',
    requestStream: false,
    responseStream: false,
    requestType: szconfigmanager_pb.SetDefaultConfigIdRequest,
    responseType: szconfigmanager_pb.SetDefaultConfigIdResponse,
    requestSerialize: serialize_szconfigmanager_SetDefaultConfigIdRequest,
    requestDeserialize: deserialize_szconfigmanager_SetDefaultConfigIdRequest,
    responseSerialize: serialize_szconfigmanager_SetDefaultConfigIdResponse,
    responseDeserialize: deserialize_szconfigmanager_SetDefaultConfigIdResponse,
  },
};

exports.SzConfigManagerClient = grpc.makeGenericClientConstructor(SzConfigManagerService);
