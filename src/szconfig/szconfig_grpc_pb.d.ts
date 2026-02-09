// package: szconfig
// file: szconfig.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as szconfig_pb from "./szconfig_pb";

interface ISzConfigService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  getDataSourceRegistry: ISzConfigService_IGetDataSourceRegistry;
  registerDataSource: ISzConfigService_IRegisterDataSource;
  unregisterDataSource: ISzConfigService_IUnregisterDataSource;
  verifyConfig: ISzConfigService_IVerifyConfig;
}

interface ISzConfigService_IGetDataSourceRegistry extends grpc.MethodDefinition<
  szconfig_pb.GetDataSourceRegistryRequest,
  szconfig_pb.GetDataSourceRegistryResponse
> {
  path: "/szconfig.SzConfig/GetDataSourceRegistry";
  requestStream: false;
  responseStream: false;
  requestSerialize: grpc.serialize<szconfig_pb.GetDataSourceRegistryRequest>;
  requestDeserialize: grpc.deserialize<szconfig_pb.GetDataSourceRegistryRequest>;
  responseSerialize: grpc.serialize<szconfig_pb.GetDataSourceRegistryResponse>;
  responseDeserialize: grpc.deserialize<szconfig_pb.GetDataSourceRegistryResponse>;
}
interface ISzConfigService_IRegisterDataSource extends grpc.MethodDefinition<
  szconfig_pb.RegisterDataSourceRequest,
  szconfig_pb.RegisterDataSourceResponse
> {
  path: "/szconfig.SzConfig/RegisterDataSource";
  requestStream: false;
  responseStream: false;
  requestSerialize: grpc.serialize<szconfig_pb.RegisterDataSourceRequest>;
  requestDeserialize: grpc.deserialize<szconfig_pb.RegisterDataSourceRequest>;
  responseSerialize: grpc.serialize<szconfig_pb.RegisterDataSourceResponse>;
  responseDeserialize: grpc.deserialize<szconfig_pb.RegisterDataSourceResponse>;
}
interface ISzConfigService_IUnregisterDataSource extends grpc.MethodDefinition<
  szconfig_pb.UnregisterDataSourceRequest,
  szconfig_pb.UnregisterDataSourceResponse
> {
  path: "/szconfig.SzConfig/UnregisterDataSource";
  requestStream: false;
  responseStream: false;
  requestSerialize: grpc.serialize<szconfig_pb.UnregisterDataSourceRequest>;
  requestDeserialize: grpc.deserialize<szconfig_pb.UnregisterDataSourceRequest>;
  responseSerialize: grpc.serialize<szconfig_pb.UnregisterDataSourceResponse>;
  responseDeserialize: grpc.deserialize<szconfig_pb.UnregisterDataSourceResponse>;
}
interface ISzConfigService_IVerifyConfig extends grpc.MethodDefinition<
  szconfig_pb.VerifyConfigRequest,
  szconfig_pb.VerifyConfigResponse
> {
  path: "/szconfig.SzConfig/VerifyConfig";
  requestStream: false;
  responseStream: false;
  requestSerialize: grpc.serialize<szconfig_pb.VerifyConfigRequest>;
  requestDeserialize: grpc.deserialize<szconfig_pb.VerifyConfigRequest>;
  responseSerialize: grpc.serialize<szconfig_pb.VerifyConfigResponse>;
  responseDeserialize: grpc.deserialize<szconfig_pb.VerifyConfigResponse>;
}

export const SzConfigService: ISzConfigService;

export interface ISzConfigServer {
  getDataSourceRegistry: grpc.handleUnaryCall<
    szconfig_pb.GetDataSourceRegistryRequest,
    szconfig_pb.GetDataSourceRegistryResponse
  >;
  registerDataSource: grpc.handleUnaryCall<
    szconfig_pb.RegisterDataSourceRequest,
    szconfig_pb.RegisterDataSourceResponse
  >;
  unregisterDataSource: grpc.handleUnaryCall<
    szconfig_pb.UnregisterDataSourceRequest,
    szconfig_pb.UnregisterDataSourceResponse
  >;
  verifyConfig: grpc.handleUnaryCall<
    szconfig_pb.VerifyConfigRequest,
    szconfig_pb.VerifyConfigResponse
  >;
}

export interface ISzConfigClient {
  getDataSourceRegistry(
    request: szconfig_pb.GetDataSourceRegistryRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: szconfig_pb.GetDataSourceRegistryResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  getDataSourceRegistry(
    request: szconfig_pb.GetDataSourceRegistryRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: szconfig_pb.GetDataSourceRegistryResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  getDataSourceRegistry(
    request: szconfig_pb.GetDataSourceRegistryRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: szconfig_pb.GetDataSourceRegistryResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  registerDataSource(
    request: szconfig_pb.RegisterDataSourceRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: szconfig_pb.RegisterDataSourceResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  registerDataSource(
    request: szconfig_pb.RegisterDataSourceRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: szconfig_pb.RegisterDataSourceResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  registerDataSource(
    request: szconfig_pb.RegisterDataSourceRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: szconfig_pb.RegisterDataSourceResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  unregisterDataSource(
    request: szconfig_pb.UnregisterDataSourceRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: szconfig_pb.UnregisterDataSourceResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  unregisterDataSource(
    request: szconfig_pb.UnregisterDataSourceRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: szconfig_pb.UnregisterDataSourceResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  unregisterDataSource(
    request: szconfig_pb.UnregisterDataSourceRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: szconfig_pb.UnregisterDataSourceResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  verifyConfig(
    request: szconfig_pb.VerifyConfigRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: szconfig_pb.VerifyConfigResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  verifyConfig(
    request: szconfig_pb.VerifyConfigRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: szconfig_pb.VerifyConfigResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  verifyConfig(
    request: szconfig_pb.VerifyConfigRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: szconfig_pb.VerifyConfigResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
}

export class SzConfigClient extends grpc.Client implements ISzConfigClient {
  constructor(
    address: string,
    credentials: grpc.ChannelCredentials,
    options?: object,
  );
  public getDataSourceRegistry(
    request: szconfig_pb.GetDataSourceRegistryRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: szconfig_pb.GetDataSourceRegistryResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public getDataSourceRegistry(
    request: szconfig_pb.GetDataSourceRegistryRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: szconfig_pb.GetDataSourceRegistryResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public getDataSourceRegistry(
    request: szconfig_pb.GetDataSourceRegistryRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: szconfig_pb.GetDataSourceRegistryResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public registerDataSource(
    request: szconfig_pb.RegisterDataSourceRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: szconfig_pb.RegisterDataSourceResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public registerDataSource(
    request: szconfig_pb.RegisterDataSourceRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: szconfig_pb.RegisterDataSourceResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public registerDataSource(
    request: szconfig_pb.RegisterDataSourceRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: szconfig_pb.RegisterDataSourceResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public unregisterDataSource(
    request: szconfig_pb.UnregisterDataSourceRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: szconfig_pb.UnregisterDataSourceResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public unregisterDataSource(
    request: szconfig_pb.UnregisterDataSourceRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: szconfig_pb.UnregisterDataSourceResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public unregisterDataSource(
    request: szconfig_pb.UnregisterDataSourceRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: szconfig_pb.UnregisterDataSourceResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public verifyConfig(
    request: szconfig_pb.VerifyConfigRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: szconfig_pb.VerifyConfigResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public verifyConfig(
    request: szconfig_pb.VerifyConfigRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: szconfig_pb.VerifyConfigResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public verifyConfig(
    request: szconfig_pb.VerifyConfigRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: szconfig_pb.VerifyConfigResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
}
