// package: szconfigmanager
// file: szconfigmanager.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as szconfigmanager_pb from "./szconfigmanager_pb";

interface ISzConfigManagerService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getConfig: ISzConfigManagerService_IGetConfig;
    getConfigRegistry: ISzConfigManagerService_IGetConfigRegistry;
    getDefaultConfigId: ISzConfigManagerService_IGetDefaultConfigId;
    getTemplateConfig: ISzConfigManagerService_IGetTemplateConfig;
    registerConfig: ISzConfigManagerService_IRegisterConfig;
    replaceDefaultConfigId: ISzConfigManagerService_IReplaceDefaultConfigId;
    setDefaultConfig: ISzConfigManagerService_ISetDefaultConfig;
    setDefaultConfigId: ISzConfigManagerService_ISetDefaultConfigId;
}

interface ISzConfigManagerService_IGetConfig extends grpc.MethodDefinition<szconfigmanager_pb.GetConfigRequest, szconfigmanager_pb.GetConfigResponse> {
    path: "/szconfigmanager.SzConfigManager/GetConfig";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<szconfigmanager_pb.GetConfigRequest>;
    requestDeserialize: grpc.deserialize<szconfigmanager_pb.GetConfigRequest>;
    responseSerialize: grpc.serialize<szconfigmanager_pb.GetConfigResponse>;
    responseDeserialize: grpc.deserialize<szconfigmanager_pb.GetConfigResponse>;
}
interface ISzConfigManagerService_IGetConfigRegistry extends grpc.MethodDefinition<szconfigmanager_pb.GetConfigRegistryRequest, szconfigmanager_pb.GetConfigRegistryResponse> {
    path: "/szconfigmanager.SzConfigManager/GetConfigRegistry";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<szconfigmanager_pb.GetConfigRegistryRequest>;
    requestDeserialize: grpc.deserialize<szconfigmanager_pb.GetConfigRegistryRequest>;
    responseSerialize: grpc.serialize<szconfigmanager_pb.GetConfigRegistryResponse>;
    responseDeserialize: grpc.deserialize<szconfigmanager_pb.GetConfigRegistryResponse>;
}
interface ISzConfigManagerService_IGetDefaultConfigId extends grpc.MethodDefinition<szconfigmanager_pb.GetDefaultConfigIdRequest, szconfigmanager_pb.GetDefaultConfigIdResponse> {
    path: "/szconfigmanager.SzConfigManager/GetDefaultConfigId";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<szconfigmanager_pb.GetDefaultConfigIdRequest>;
    requestDeserialize: grpc.deserialize<szconfigmanager_pb.GetDefaultConfigIdRequest>;
    responseSerialize: grpc.serialize<szconfigmanager_pb.GetDefaultConfigIdResponse>;
    responseDeserialize: grpc.deserialize<szconfigmanager_pb.GetDefaultConfigIdResponse>;
}
interface ISzConfigManagerService_IGetTemplateConfig extends grpc.MethodDefinition<szconfigmanager_pb.GetTemplateConfigRequest, szconfigmanager_pb.GetTemplateConfigResponse> {
    path: "/szconfigmanager.SzConfigManager/GetTemplateConfig";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<szconfigmanager_pb.GetTemplateConfigRequest>;
    requestDeserialize: grpc.deserialize<szconfigmanager_pb.GetTemplateConfigRequest>;
    responseSerialize: grpc.serialize<szconfigmanager_pb.GetTemplateConfigResponse>;
    responseDeserialize: grpc.deserialize<szconfigmanager_pb.GetTemplateConfigResponse>;
}
interface ISzConfigManagerService_IRegisterConfig extends grpc.MethodDefinition<szconfigmanager_pb.RegisterConfigRequest, szconfigmanager_pb.RegisterConfigResponse> {
    path: "/szconfigmanager.SzConfigManager/RegisterConfig";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<szconfigmanager_pb.RegisterConfigRequest>;
    requestDeserialize: grpc.deserialize<szconfigmanager_pb.RegisterConfigRequest>;
    responseSerialize: grpc.serialize<szconfigmanager_pb.RegisterConfigResponse>;
    responseDeserialize: grpc.deserialize<szconfigmanager_pb.RegisterConfigResponse>;
}
interface ISzConfigManagerService_IReplaceDefaultConfigId extends grpc.MethodDefinition<szconfigmanager_pb.ReplaceDefaultConfigIdRequest, szconfigmanager_pb.ReplaceDefaultConfigIdResponse> {
    path: "/szconfigmanager.SzConfigManager/ReplaceDefaultConfigId";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<szconfigmanager_pb.ReplaceDefaultConfigIdRequest>;
    requestDeserialize: grpc.deserialize<szconfigmanager_pb.ReplaceDefaultConfigIdRequest>;
    responseSerialize: grpc.serialize<szconfigmanager_pb.ReplaceDefaultConfigIdResponse>;
    responseDeserialize: grpc.deserialize<szconfigmanager_pb.ReplaceDefaultConfigIdResponse>;
}
interface ISzConfigManagerService_ISetDefaultConfig extends grpc.MethodDefinition<szconfigmanager_pb.SetDefaultConfigRequest, szconfigmanager_pb.SetDefaultConfigResponse> {
    path: "/szconfigmanager.SzConfigManager/SetDefaultConfig";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<szconfigmanager_pb.SetDefaultConfigRequest>;
    requestDeserialize: grpc.deserialize<szconfigmanager_pb.SetDefaultConfigRequest>;
    responseSerialize: grpc.serialize<szconfigmanager_pb.SetDefaultConfigResponse>;
    responseDeserialize: grpc.deserialize<szconfigmanager_pb.SetDefaultConfigResponse>;
}
interface ISzConfigManagerService_ISetDefaultConfigId extends grpc.MethodDefinition<szconfigmanager_pb.SetDefaultConfigIdRequest, szconfigmanager_pb.SetDefaultConfigIdResponse> {
    path: "/szconfigmanager.SzConfigManager/SetDefaultConfigId";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<szconfigmanager_pb.SetDefaultConfigIdRequest>;
    requestDeserialize: grpc.deserialize<szconfigmanager_pb.SetDefaultConfigIdRequest>;
    responseSerialize: grpc.serialize<szconfigmanager_pb.SetDefaultConfigIdResponse>;
    responseDeserialize: grpc.deserialize<szconfigmanager_pb.SetDefaultConfigIdResponse>;
}

export const SzConfigManagerService: ISzConfigManagerService;

export interface ISzConfigManagerServer {
    getConfig: grpc.handleUnaryCall<szconfigmanager_pb.GetConfigRequest, szconfigmanager_pb.GetConfigResponse>;
    getConfigRegistry: grpc.handleUnaryCall<szconfigmanager_pb.GetConfigRegistryRequest, szconfigmanager_pb.GetConfigRegistryResponse>;
    getDefaultConfigId: grpc.handleUnaryCall<szconfigmanager_pb.GetDefaultConfigIdRequest, szconfigmanager_pb.GetDefaultConfigIdResponse>;
    getTemplateConfig: grpc.handleUnaryCall<szconfigmanager_pb.GetTemplateConfigRequest, szconfigmanager_pb.GetTemplateConfigResponse>;
    registerConfig: grpc.handleUnaryCall<szconfigmanager_pb.RegisterConfigRequest, szconfigmanager_pb.RegisterConfigResponse>;
    replaceDefaultConfigId: grpc.handleUnaryCall<szconfigmanager_pb.ReplaceDefaultConfigIdRequest, szconfigmanager_pb.ReplaceDefaultConfigIdResponse>;
    setDefaultConfig: grpc.handleUnaryCall<szconfigmanager_pb.SetDefaultConfigRequest, szconfigmanager_pb.SetDefaultConfigResponse>;
    setDefaultConfigId: grpc.handleUnaryCall<szconfigmanager_pb.SetDefaultConfigIdRequest, szconfigmanager_pb.SetDefaultConfigIdResponse>;
}

export interface ISzConfigManagerClient {
    getConfig(request: szconfigmanager_pb.GetConfigRequest, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.GetConfigResponse) => void): grpc.ClientUnaryCall;
    getConfig(request: szconfigmanager_pb.GetConfigRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.GetConfigResponse) => void): grpc.ClientUnaryCall;
    getConfig(request: szconfigmanager_pb.GetConfigRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.GetConfigResponse) => void): grpc.ClientUnaryCall;
    getConfigRegistry(request: szconfigmanager_pb.GetConfigRegistryRequest, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.GetConfigRegistryResponse) => void): grpc.ClientUnaryCall;
    getConfigRegistry(request: szconfigmanager_pb.GetConfigRegistryRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.GetConfigRegistryResponse) => void): grpc.ClientUnaryCall;
    getConfigRegistry(request: szconfigmanager_pb.GetConfigRegistryRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.GetConfigRegistryResponse) => void): grpc.ClientUnaryCall;
    getDefaultConfigId(request: szconfigmanager_pb.GetDefaultConfigIdRequest, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.GetDefaultConfigIdResponse) => void): grpc.ClientUnaryCall;
    getDefaultConfigId(request: szconfigmanager_pb.GetDefaultConfigIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.GetDefaultConfigIdResponse) => void): grpc.ClientUnaryCall;
    getDefaultConfigId(request: szconfigmanager_pb.GetDefaultConfigIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.GetDefaultConfigIdResponse) => void): grpc.ClientUnaryCall;
    getTemplateConfig(request: szconfigmanager_pb.GetTemplateConfigRequest, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.GetTemplateConfigResponse) => void): grpc.ClientUnaryCall;
    getTemplateConfig(request: szconfigmanager_pb.GetTemplateConfigRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.GetTemplateConfigResponse) => void): grpc.ClientUnaryCall;
    getTemplateConfig(request: szconfigmanager_pb.GetTemplateConfigRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.GetTemplateConfigResponse) => void): grpc.ClientUnaryCall;
    registerConfig(request: szconfigmanager_pb.RegisterConfigRequest, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.RegisterConfigResponse) => void): grpc.ClientUnaryCall;
    registerConfig(request: szconfigmanager_pb.RegisterConfigRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.RegisterConfigResponse) => void): grpc.ClientUnaryCall;
    registerConfig(request: szconfigmanager_pb.RegisterConfigRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.RegisterConfigResponse) => void): grpc.ClientUnaryCall;
    replaceDefaultConfigId(request: szconfigmanager_pb.ReplaceDefaultConfigIdRequest, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.ReplaceDefaultConfigIdResponse) => void): grpc.ClientUnaryCall;
    replaceDefaultConfigId(request: szconfigmanager_pb.ReplaceDefaultConfigIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.ReplaceDefaultConfigIdResponse) => void): grpc.ClientUnaryCall;
    replaceDefaultConfigId(request: szconfigmanager_pb.ReplaceDefaultConfigIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.ReplaceDefaultConfigIdResponse) => void): grpc.ClientUnaryCall;
    setDefaultConfig(request: szconfigmanager_pb.SetDefaultConfigRequest, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.SetDefaultConfigResponse) => void): grpc.ClientUnaryCall;
    setDefaultConfig(request: szconfigmanager_pb.SetDefaultConfigRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.SetDefaultConfigResponse) => void): grpc.ClientUnaryCall;
    setDefaultConfig(request: szconfigmanager_pb.SetDefaultConfigRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.SetDefaultConfigResponse) => void): grpc.ClientUnaryCall;
    setDefaultConfigId(request: szconfigmanager_pb.SetDefaultConfigIdRequest, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.SetDefaultConfigIdResponse) => void): grpc.ClientUnaryCall;
    setDefaultConfigId(request: szconfigmanager_pb.SetDefaultConfigIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.SetDefaultConfigIdResponse) => void): grpc.ClientUnaryCall;
    setDefaultConfigId(request: szconfigmanager_pb.SetDefaultConfigIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.SetDefaultConfigIdResponse) => void): grpc.ClientUnaryCall;
}

export class SzConfigManagerClient extends grpc.Client implements ISzConfigManagerClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getConfig(request: szconfigmanager_pb.GetConfigRequest, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.GetConfigResponse) => void): grpc.ClientUnaryCall;
    public getConfig(request: szconfigmanager_pb.GetConfigRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.GetConfigResponse) => void): grpc.ClientUnaryCall;
    public getConfig(request: szconfigmanager_pb.GetConfigRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.GetConfigResponse) => void): grpc.ClientUnaryCall;
    public getConfigRegistry(request: szconfigmanager_pb.GetConfigRegistryRequest, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.GetConfigRegistryResponse) => void): grpc.ClientUnaryCall;
    public getConfigRegistry(request: szconfigmanager_pb.GetConfigRegistryRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.GetConfigRegistryResponse) => void): grpc.ClientUnaryCall;
    public getConfigRegistry(request: szconfigmanager_pb.GetConfigRegistryRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.GetConfigRegistryResponse) => void): grpc.ClientUnaryCall;
    public getDefaultConfigId(request: szconfigmanager_pb.GetDefaultConfigIdRequest, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.GetDefaultConfigIdResponse) => void): grpc.ClientUnaryCall;
    public getDefaultConfigId(request: szconfigmanager_pb.GetDefaultConfigIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.GetDefaultConfigIdResponse) => void): grpc.ClientUnaryCall;
    public getDefaultConfigId(request: szconfigmanager_pb.GetDefaultConfigIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.GetDefaultConfigIdResponse) => void): grpc.ClientUnaryCall;
    public getTemplateConfig(request: szconfigmanager_pb.GetTemplateConfigRequest, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.GetTemplateConfigResponse) => void): grpc.ClientUnaryCall;
    public getTemplateConfig(request: szconfigmanager_pb.GetTemplateConfigRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.GetTemplateConfigResponse) => void): grpc.ClientUnaryCall;
    public getTemplateConfig(request: szconfigmanager_pb.GetTemplateConfigRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.GetTemplateConfigResponse) => void): grpc.ClientUnaryCall;
    public registerConfig(request: szconfigmanager_pb.RegisterConfigRequest, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.RegisterConfigResponse) => void): grpc.ClientUnaryCall;
    public registerConfig(request: szconfigmanager_pb.RegisterConfigRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.RegisterConfigResponse) => void): grpc.ClientUnaryCall;
    public registerConfig(request: szconfigmanager_pb.RegisterConfigRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.RegisterConfigResponse) => void): grpc.ClientUnaryCall;
    public replaceDefaultConfigId(request: szconfigmanager_pb.ReplaceDefaultConfigIdRequest, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.ReplaceDefaultConfigIdResponse) => void): grpc.ClientUnaryCall;
    public replaceDefaultConfigId(request: szconfigmanager_pb.ReplaceDefaultConfigIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.ReplaceDefaultConfigIdResponse) => void): grpc.ClientUnaryCall;
    public replaceDefaultConfigId(request: szconfigmanager_pb.ReplaceDefaultConfigIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.ReplaceDefaultConfigIdResponse) => void): grpc.ClientUnaryCall;
    public setDefaultConfig(request: szconfigmanager_pb.SetDefaultConfigRequest, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.SetDefaultConfigResponse) => void): grpc.ClientUnaryCall;
    public setDefaultConfig(request: szconfigmanager_pb.SetDefaultConfigRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.SetDefaultConfigResponse) => void): grpc.ClientUnaryCall;
    public setDefaultConfig(request: szconfigmanager_pb.SetDefaultConfigRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.SetDefaultConfigResponse) => void): grpc.ClientUnaryCall;
    public setDefaultConfigId(request: szconfigmanager_pb.SetDefaultConfigIdRequest, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.SetDefaultConfigIdResponse) => void): grpc.ClientUnaryCall;
    public setDefaultConfigId(request: szconfigmanager_pb.SetDefaultConfigIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.SetDefaultConfigIdResponse) => void): grpc.ClientUnaryCall;
    public setDefaultConfigId(request: szconfigmanager_pb.SetDefaultConfigIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: szconfigmanager_pb.SetDefaultConfigIdResponse) => void): grpc.ClientUnaryCall;
}
