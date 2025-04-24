// package: szconfig
// file: szconfig.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as szconfig_pb from "./szconfig_pb";

interface ISzConfigService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    addDataSource: ISzConfigService_IAddDataSource;
    deleteDataSource: ISzConfigService_IDeleteDataSource;
    getDataSources: ISzConfigService_IGetDataSources;
    verifyConfig: ISzConfigService_IVerifyConfig;
}

interface ISzConfigService_IAddDataSource extends grpc.MethodDefinition<szconfig_pb.AddDataSourceRequest, szconfig_pb.AddDataSourceResponse> {
    path: "/szconfig.SzConfig/AddDataSource";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<szconfig_pb.AddDataSourceRequest>;
    requestDeserialize: grpc.deserialize<szconfig_pb.AddDataSourceRequest>;
    responseSerialize: grpc.serialize<szconfig_pb.AddDataSourceResponse>;
    responseDeserialize: grpc.deserialize<szconfig_pb.AddDataSourceResponse>;
}
interface ISzConfigService_IDeleteDataSource extends grpc.MethodDefinition<szconfig_pb.DeleteDataSourceRequest, szconfig_pb.DeleteDataSourceResponse> {
    path: "/szconfig.SzConfig/DeleteDataSource";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<szconfig_pb.DeleteDataSourceRequest>;
    requestDeserialize: grpc.deserialize<szconfig_pb.DeleteDataSourceRequest>;
    responseSerialize: grpc.serialize<szconfig_pb.DeleteDataSourceResponse>;
    responseDeserialize: grpc.deserialize<szconfig_pb.DeleteDataSourceResponse>;
}
interface ISzConfigService_IGetDataSources extends grpc.MethodDefinition<szconfig_pb.GetDataSourcesRequest, szconfig_pb.GetDataSourcesResponse> {
    path: "/szconfig.SzConfig/GetDataSources";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<szconfig_pb.GetDataSourcesRequest>;
    requestDeserialize: grpc.deserialize<szconfig_pb.GetDataSourcesRequest>;
    responseSerialize: grpc.serialize<szconfig_pb.GetDataSourcesResponse>;
    responseDeserialize: grpc.deserialize<szconfig_pb.GetDataSourcesResponse>;
}
interface ISzConfigService_IVerifyConfig extends grpc.MethodDefinition<szconfig_pb.VerifyConfigRequest, szconfig_pb.VerifyConfigResponse> {
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
    addDataSource: grpc.handleUnaryCall<szconfig_pb.AddDataSourceRequest, szconfig_pb.AddDataSourceResponse>;
    deleteDataSource: grpc.handleUnaryCall<szconfig_pb.DeleteDataSourceRequest, szconfig_pb.DeleteDataSourceResponse>;
    getDataSources: grpc.handleUnaryCall<szconfig_pb.GetDataSourcesRequest, szconfig_pb.GetDataSourcesResponse>;
    verifyConfig: grpc.handleUnaryCall<szconfig_pb.VerifyConfigRequest, szconfig_pb.VerifyConfigResponse>;
}

export interface ISzConfigClient {
    addDataSource(request: szconfig_pb.AddDataSourceRequest, callback: (error: grpc.ServiceError | null, response: szconfig_pb.AddDataSourceResponse) => void): grpc.ClientUnaryCall;
    addDataSource(request: szconfig_pb.AddDataSourceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: szconfig_pb.AddDataSourceResponse) => void): grpc.ClientUnaryCall;
    addDataSource(request: szconfig_pb.AddDataSourceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: szconfig_pb.AddDataSourceResponse) => void): grpc.ClientUnaryCall;
    deleteDataSource(request: szconfig_pb.DeleteDataSourceRequest, callback: (error: grpc.ServiceError | null, response: szconfig_pb.DeleteDataSourceResponse) => void): grpc.ClientUnaryCall;
    deleteDataSource(request: szconfig_pb.DeleteDataSourceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: szconfig_pb.DeleteDataSourceResponse) => void): grpc.ClientUnaryCall;
    deleteDataSource(request: szconfig_pb.DeleteDataSourceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: szconfig_pb.DeleteDataSourceResponse) => void): grpc.ClientUnaryCall;
    getDataSources(request: szconfig_pb.GetDataSourcesRequest, callback: (error: grpc.ServiceError | null, response: szconfig_pb.GetDataSourcesResponse) => void): grpc.ClientUnaryCall;
    getDataSources(request: szconfig_pb.GetDataSourcesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: szconfig_pb.GetDataSourcesResponse) => void): grpc.ClientUnaryCall;
    getDataSources(request: szconfig_pb.GetDataSourcesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: szconfig_pb.GetDataSourcesResponse) => void): grpc.ClientUnaryCall;
    verifyConfig(request: szconfig_pb.VerifyConfigRequest, callback: (error: grpc.ServiceError | null, response: szconfig_pb.VerifyConfigResponse) => void): grpc.ClientUnaryCall;
    verifyConfig(request: szconfig_pb.VerifyConfigRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: szconfig_pb.VerifyConfigResponse) => void): grpc.ClientUnaryCall;
    verifyConfig(request: szconfig_pb.VerifyConfigRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: szconfig_pb.VerifyConfigResponse) => void): grpc.ClientUnaryCall;
}

export class SzConfigClient extends grpc.Client implements ISzConfigClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public addDataSource(request: szconfig_pb.AddDataSourceRequest, callback: (error: grpc.ServiceError | null, response: szconfig_pb.AddDataSourceResponse) => void): grpc.ClientUnaryCall;
    public addDataSource(request: szconfig_pb.AddDataSourceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: szconfig_pb.AddDataSourceResponse) => void): grpc.ClientUnaryCall;
    public addDataSource(request: szconfig_pb.AddDataSourceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: szconfig_pb.AddDataSourceResponse) => void): grpc.ClientUnaryCall;
    public deleteDataSource(request: szconfig_pb.DeleteDataSourceRequest, callback: (error: grpc.ServiceError | null, response: szconfig_pb.DeleteDataSourceResponse) => void): grpc.ClientUnaryCall;
    public deleteDataSource(request: szconfig_pb.DeleteDataSourceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: szconfig_pb.DeleteDataSourceResponse) => void): grpc.ClientUnaryCall;
    public deleteDataSource(request: szconfig_pb.DeleteDataSourceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: szconfig_pb.DeleteDataSourceResponse) => void): grpc.ClientUnaryCall;
    public getDataSources(request: szconfig_pb.GetDataSourcesRequest, callback: (error: grpc.ServiceError | null, response: szconfig_pb.GetDataSourcesResponse) => void): grpc.ClientUnaryCall;
    public getDataSources(request: szconfig_pb.GetDataSourcesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: szconfig_pb.GetDataSourcesResponse) => void): grpc.ClientUnaryCall;
    public getDataSources(request: szconfig_pb.GetDataSourcesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: szconfig_pb.GetDataSourcesResponse) => void): grpc.ClientUnaryCall;
    public verifyConfig(request: szconfig_pb.VerifyConfigRequest, callback: (error: grpc.ServiceError | null, response: szconfig_pb.VerifyConfigResponse) => void): grpc.ClientUnaryCall;
    public verifyConfig(request: szconfig_pb.VerifyConfigRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: szconfig_pb.VerifyConfigResponse) => void): grpc.ClientUnaryCall;
    public verifyConfig(request: szconfig_pb.VerifyConfigRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: szconfig_pb.VerifyConfigResponse) => void): grpc.ClientUnaryCall;
}
