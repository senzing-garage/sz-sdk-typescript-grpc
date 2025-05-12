import * as jspb from 'google-protobuf'



export class CheckDatastorePerformanceRequest extends jspb.Message {
  getSecondsToRun(): number;
  setSecondsToRun(value: number): CheckDatastorePerformanceRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CheckDatastorePerformanceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CheckDatastorePerformanceRequest): CheckDatastorePerformanceRequest.AsObject;
  static serializeBinaryToWriter(message: CheckDatastorePerformanceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CheckDatastorePerformanceRequest;
  static deserializeBinaryFromReader(message: CheckDatastorePerformanceRequest, reader: jspb.BinaryReader): CheckDatastorePerformanceRequest;
}

export namespace CheckDatastorePerformanceRequest {
  export type AsObject = {
    secondsToRun: number,
  }
}

export class CheckDatastorePerformanceResponse extends jspb.Message {
  getResult(): string;
  setResult(value: string): CheckDatastorePerformanceResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CheckDatastorePerformanceResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CheckDatastorePerformanceResponse): CheckDatastorePerformanceResponse.AsObject;
  static serializeBinaryToWriter(message: CheckDatastorePerformanceResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CheckDatastorePerformanceResponse;
  static deserializeBinaryFromReader(message: CheckDatastorePerformanceResponse, reader: jspb.BinaryReader): CheckDatastorePerformanceResponse;
}

export namespace CheckDatastorePerformanceResponse {
  export type AsObject = {
    result: string,
  }
}

export class GetDatastoreInfoRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetDatastoreInfoRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetDatastoreInfoRequest): GetDatastoreInfoRequest.AsObject;
  static serializeBinaryToWriter(message: GetDatastoreInfoRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetDatastoreInfoRequest;
  static deserializeBinaryFromReader(message: GetDatastoreInfoRequest, reader: jspb.BinaryReader): GetDatastoreInfoRequest;
}

export namespace GetDatastoreInfoRequest {
  export type AsObject = {
  }
}

export class GetDatastoreInfoResponse extends jspb.Message {
  getResult(): string;
  setResult(value: string): GetDatastoreInfoResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetDatastoreInfoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetDatastoreInfoResponse): GetDatastoreInfoResponse.AsObject;
  static serializeBinaryToWriter(message: GetDatastoreInfoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetDatastoreInfoResponse;
  static deserializeBinaryFromReader(message: GetDatastoreInfoResponse, reader: jspb.BinaryReader): GetDatastoreInfoResponse;
}

export namespace GetDatastoreInfoResponse {
  export type AsObject = {
    result: string,
  }
}

export class GetFeatureRequest extends jspb.Message {
  getFeatureId(): number;
  setFeatureId(value: number): GetFeatureRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetFeatureRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetFeatureRequest): GetFeatureRequest.AsObject;
  static serializeBinaryToWriter(message: GetFeatureRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetFeatureRequest;
  static deserializeBinaryFromReader(message: GetFeatureRequest, reader: jspb.BinaryReader): GetFeatureRequest;
}

export namespace GetFeatureRequest {
  export type AsObject = {
    featureId: number,
  }
}

export class GetFeatureResponse extends jspb.Message {
  getResult(): string;
  setResult(value: string): GetFeatureResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetFeatureResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetFeatureResponse): GetFeatureResponse.AsObject;
  static serializeBinaryToWriter(message: GetFeatureResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetFeatureResponse;
  static deserializeBinaryFromReader(message: GetFeatureResponse, reader: jspb.BinaryReader): GetFeatureResponse;
}

export namespace GetFeatureResponse {
  export type AsObject = {
    result: string,
  }
}

export class PurgeRepositoryRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PurgeRepositoryRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PurgeRepositoryRequest): PurgeRepositoryRequest.AsObject;
  static serializeBinaryToWriter(message: PurgeRepositoryRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PurgeRepositoryRequest;
  static deserializeBinaryFromReader(message: PurgeRepositoryRequest, reader: jspb.BinaryReader): PurgeRepositoryRequest;
}

export namespace PurgeRepositoryRequest {
  export type AsObject = {
  }
}

export class PurgeRepositoryResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PurgeRepositoryResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PurgeRepositoryResponse): PurgeRepositoryResponse.AsObject;
  static serializeBinaryToWriter(message: PurgeRepositoryResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PurgeRepositoryResponse;
  static deserializeBinaryFromReader(message: PurgeRepositoryResponse, reader: jspb.BinaryReader): PurgeRepositoryResponse;
}

export namespace PurgeRepositoryResponse {
  export type AsObject = {
  }
}

export class ReinitializeRequest extends jspb.Message {
  getConfigId(): number;
  setConfigId(value: number): ReinitializeRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ReinitializeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ReinitializeRequest): ReinitializeRequest.AsObject;
  static serializeBinaryToWriter(message: ReinitializeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ReinitializeRequest;
  static deserializeBinaryFromReader(message: ReinitializeRequest, reader: jspb.BinaryReader): ReinitializeRequest;
}

export namespace ReinitializeRequest {
  export type AsObject = {
    configId: number,
  }
}

export class ReinitializeResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ReinitializeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ReinitializeResponse): ReinitializeResponse.AsObject;
  static serializeBinaryToWriter(message: ReinitializeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ReinitializeResponse;
  static deserializeBinaryFromReader(message: ReinitializeResponse, reader: jspb.BinaryReader): ReinitializeResponse;
}

export namespace ReinitializeResponse {
  export type AsObject = {
  }
}

