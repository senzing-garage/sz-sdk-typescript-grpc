// package: szdiagnostic
// file: szdiagnostic.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as szdiagnostic_pb from "./szdiagnostic_pb";

interface ISzDiagnosticService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    checkRepositoryPerformance: ISzDiagnosticService_ICheckRepositoryPerformance;
    getFeature: ISzDiagnosticService_IGetFeature;
    getRepositoryInfo: ISzDiagnosticService_IGetRepositoryInfo;
    purgeRepository: ISzDiagnosticService_IPurgeRepository;
    reinitialize: ISzDiagnosticService_IReinitialize;
}

interface ISzDiagnosticService_ICheckRepositoryPerformance extends grpc.MethodDefinition<szdiagnostic_pb.CheckRepositoryPerformanceRequest, szdiagnostic_pb.CheckRepositoryPerformanceResponse> {
    path: "/szdiagnostic.SzDiagnostic/CheckRepositoryPerformance";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<szdiagnostic_pb.CheckRepositoryPerformanceRequest>;
    requestDeserialize: grpc.deserialize<szdiagnostic_pb.CheckRepositoryPerformanceRequest>;
    responseSerialize: grpc.serialize<szdiagnostic_pb.CheckRepositoryPerformanceResponse>;
    responseDeserialize: grpc.deserialize<szdiagnostic_pb.CheckRepositoryPerformanceResponse>;
}
interface ISzDiagnosticService_IGetFeature extends grpc.MethodDefinition<szdiagnostic_pb.GetFeatureRequest, szdiagnostic_pb.GetFeatureResponse> {
    path: "/szdiagnostic.SzDiagnostic/GetFeature";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<szdiagnostic_pb.GetFeatureRequest>;
    requestDeserialize: grpc.deserialize<szdiagnostic_pb.GetFeatureRequest>;
    responseSerialize: grpc.serialize<szdiagnostic_pb.GetFeatureResponse>;
    responseDeserialize: grpc.deserialize<szdiagnostic_pb.GetFeatureResponse>;
}
interface ISzDiagnosticService_IGetRepositoryInfo extends grpc.MethodDefinition<szdiagnostic_pb.GetRepositoryInfoRequest, szdiagnostic_pb.GetRepositoryInfoResponse> {
    path: "/szdiagnostic.SzDiagnostic/GetRepositoryInfo";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<szdiagnostic_pb.GetRepositoryInfoRequest>;
    requestDeserialize: grpc.deserialize<szdiagnostic_pb.GetRepositoryInfoRequest>;
    responseSerialize: grpc.serialize<szdiagnostic_pb.GetRepositoryInfoResponse>;
    responseDeserialize: grpc.deserialize<szdiagnostic_pb.GetRepositoryInfoResponse>;
}
interface ISzDiagnosticService_IPurgeRepository extends grpc.MethodDefinition<szdiagnostic_pb.PurgeRepositoryRequest, szdiagnostic_pb.PurgeRepositoryResponse> {
    path: "/szdiagnostic.SzDiagnostic/PurgeRepository";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<szdiagnostic_pb.PurgeRepositoryRequest>;
    requestDeserialize: grpc.deserialize<szdiagnostic_pb.PurgeRepositoryRequest>;
    responseSerialize: grpc.serialize<szdiagnostic_pb.PurgeRepositoryResponse>;
    responseDeserialize: grpc.deserialize<szdiagnostic_pb.PurgeRepositoryResponse>;
}
interface ISzDiagnosticService_IReinitialize extends grpc.MethodDefinition<szdiagnostic_pb.ReinitializeRequest, szdiagnostic_pb.ReinitializeResponse> {
    path: "/szdiagnostic.SzDiagnostic/Reinitialize";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<szdiagnostic_pb.ReinitializeRequest>;
    requestDeserialize: grpc.deserialize<szdiagnostic_pb.ReinitializeRequest>;
    responseSerialize: grpc.serialize<szdiagnostic_pb.ReinitializeResponse>;
    responseDeserialize: grpc.deserialize<szdiagnostic_pb.ReinitializeResponse>;
}

export const SzDiagnosticService: ISzDiagnosticService;

export interface ISzDiagnosticServer {
    checkRepositoryPerformance: grpc.handleUnaryCall<szdiagnostic_pb.CheckRepositoryPerformanceRequest, szdiagnostic_pb.CheckRepositoryPerformanceResponse>;
    getFeature: grpc.handleUnaryCall<szdiagnostic_pb.GetFeatureRequest, szdiagnostic_pb.GetFeatureResponse>;
    getRepositoryInfo: grpc.handleUnaryCall<szdiagnostic_pb.GetRepositoryInfoRequest, szdiagnostic_pb.GetRepositoryInfoResponse>;
    purgeRepository: grpc.handleUnaryCall<szdiagnostic_pb.PurgeRepositoryRequest, szdiagnostic_pb.PurgeRepositoryResponse>;
    reinitialize: grpc.handleUnaryCall<szdiagnostic_pb.ReinitializeRequest, szdiagnostic_pb.ReinitializeResponse>;
}

export interface ISzDiagnosticClient {
    checkRepositoryPerformance(request: szdiagnostic_pb.CheckRepositoryPerformanceRequest, callback: (error: grpc.ServiceError | null, response: szdiagnostic_pb.CheckRepositoryPerformanceResponse) => void): grpc.ClientUnaryCall;
    checkRepositoryPerformance(request: szdiagnostic_pb.CheckRepositoryPerformanceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: szdiagnostic_pb.CheckRepositoryPerformanceResponse) => void): grpc.ClientUnaryCall;
    checkRepositoryPerformance(request: szdiagnostic_pb.CheckRepositoryPerformanceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: szdiagnostic_pb.CheckRepositoryPerformanceResponse) => void): grpc.ClientUnaryCall;
    getFeature(request: szdiagnostic_pb.GetFeatureRequest, callback: (error: grpc.ServiceError | null, response: szdiagnostic_pb.GetFeatureResponse) => void): grpc.ClientUnaryCall;
    getFeature(request: szdiagnostic_pb.GetFeatureRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: szdiagnostic_pb.GetFeatureResponse) => void): grpc.ClientUnaryCall;
    getFeature(request: szdiagnostic_pb.GetFeatureRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: szdiagnostic_pb.GetFeatureResponse) => void): grpc.ClientUnaryCall;
    getRepositoryInfo(request: szdiagnostic_pb.GetRepositoryInfoRequest, callback: (error: grpc.ServiceError | null, response: szdiagnostic_pb.GetRepositoryInfoResponse) => void): grpc.ClientUnaryCall;
    getRepositoryInfo(request: szdiagnostic_pb.GetRepositoryInfoRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: szdiagnostic_pb.GetRepositoryInfoResponse) => void): grpc.ClientUnaryCall;
    getRepositoryInfo(request: szdiagnostic_pb.GetRepositoryInfoRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: szdiagnostic_pb.GetRepositoryInfoResponse) => void): grpc.ClientUnaryCall;
    purgeRepository(request: szdiagnostic_pb.PurgeRepositoryRequest, callback: (error: grpc.ServiceError | null, response: szdiagnostic_pb.PurgeRepositoryResponse) => void): grpc.ClientUnaryCall;
    purgeRepository(request: szdiagnostic_pb.PurgeRepositoryRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: szdiagnostic_pb.PurgeRepositoryResponse) => void): grpc.ClientUnaryCall;
    purgeRepository(request: szdiagnostic_pb.PurgeRepositoryRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: szdiagnostic_pb.PurgeRepositoryResponse) => void): grpc.ClientUnaryCall;
    reinitialize(request: szdiagnostic_pb.ReinitializeRequest, callback: (error: grpc.ServiceError | null, response: szdiagnostic_pb.ReinitializeResponse) => void): grpc.ClientUnaryCall;
    reinitialize(request: szdiagnostic_pb.ReinitializeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: szdiagnostic_pb.ReinitializeResponse) => void): grpc.ClientUnaryCall;
    reinitialize(request: szdiagnostic_pb.ReinitializeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: szdiagnostic_pb.ReinitializeResponse) => void): grpc.ClientUnaryCall;
}

export class SzDiagnosticClient extends grpc.Client implements ISzDiagnosticClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public checkRepositoryPerformance(request: szdiagnostic_pb.CheckRepositoryPerformanceRequest, callback: (error: grpc.ServiceError | null, response: szdiagnostic_pb.CheckRepositoryPerformanceResponse) => void): grpc.ClientUnaryCall;
    public checkRepositoryPerformance(request: szdiagnostic_pb.CheckRepositoryPerformanceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: szdiagnostic_pb.CheckRepositoryPerformanceResponse) => void): grpc.ClientUnaryCall;
    public checkRepositoryPerformance(request: szdiagnostic_pb.CheckRepositoryPerformanceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: szdiagnostic_pb.CheckRepositoryPerformanceResponse) => void): grpc.ClientUnaryCall;
    public getFeature(request: szdiagnostic_pb.GetFeatureRequest, callback: (error: grpc.ServiceError | null, response: szdiagnostic_pb.GetFeatureResponse) => void): grpc.ClientUnaryCall;
    public getFeature(request: szdiagnostic_pb.GetFeatureRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: szdiagnostic_pb.GetFeatureResponse) => void): grpc.ClientUnaryCall;
    public getFeature(request: szdiagnostic_pb.GetFeatureRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: szdiagnostic_pb.GetFeatureResponse) => void): grpc.ClientUnaryCall;
    public getRepositoryInfo(request: szdiagnostic_pb.GetRepositoryInfoRequest, callback: (error: grpc.ServiceError | null, response: szdiagnostic_pb.GetRepositoryInfoResponse) => void): grpc.ClientUnaryCall;
    public getRepositoryInfo(request: szdiagnostic_pb.GetRepositoryInfoRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: szdiagnostic_pb.GetRepositoryInfoResponse) => void): grpc.ClientUnaryCall;
    public getRepositoryInfo(request: szdiagnostic_pb.GetRepositoryInfoRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: szdiagnostic_pb.GetRepositoryInfoResponse) => void): grpc.ClientUnaryCall;
    public purgeRepository(request: szdiagnostic_pb.PurgeRepositoryRequest, callback: (error: grpc.ServiceError | null, response: szdiagnostic_pb.PurgeRepositoryResponse) => void): grpc.ClientUnaryCall;
    public purgeRepository(request: szdiagnostic_pb.PurgeRepositoryRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: szdiagnostic_pb.PurgeRepositoryResponse) => void): grpc.ClientUnaryCall;
    public purgeRepository(request: szdiagnostic_pb.PurgeRepositoryRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: szdiagnostic_pb.PurgeRepositoryResponse) => void): grpc.ClientUnaryCall;
    public reinitialize(request: szdiagnostic_pb.ReinitializeRequest, callback: (error: grpc.ServiceError | null, response: szdiagnostic_pb.ReinitializeResponse) => void): grpc.ClientUnaryCall;
    public reinitialize(request: szdiagnostic_pb.ReinitializeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: szdiagnostic_pb.ReinitializeResponse) => void): grpc.ClientUnaryCall;
    public reinitialize(request: szdiagnostic_pb.ReinitializeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: szdiagnostic_pb.ReinitializeResponse) => void): grpc.ClientUnaryCall;
}
