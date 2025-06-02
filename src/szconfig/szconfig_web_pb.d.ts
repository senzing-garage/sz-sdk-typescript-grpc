import * as jspb from 'google-protobuf'



export class AddDataSourceRequest extends jspb.Message {
  getConfigDefinition(): string;
  setConfigDefinition(value: string): AddDataSourceRequest;

  getDataSourceCode(): string;
  setDataSourceCode(value: string): AddDataSourceRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddDataSourceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AddDataSourceRequest): AddDataSourceRequest.AsObject;
  static serializeBinaryToWriter(message: AddDataSourceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddDataSourceRequest;
  static deserializeBinaryFromReader(message: AddDataSourceRequest, reader: jspb.BinaryReader): AddDataSourceRequest;
}

export namespace AddDataSourceRequest {
  export type AsObject = {
    configDefinition: string,
    dataSourceCode: string,
  }
}

export class AddDataSourceResponse extends jspb.Message {
  getResult(): string;
  setResult(value: string): AddDataSourceResponse;

  getConfigDefinition(): string;
  setConfigDefinition(value: string): AddDataSourceResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddDataSourceResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AddDataSourceResponse): AddDataSourceResponse.AsObject;
  static serializeBinaryToWriter(message: AddDataSourceResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddDataSourceResponse;
  static deserializeBinaryFromReader(message: AddDataSourceResponse, reader: jspb.BinaryReader): AddDataSourceResponse;
}

export namespace AddDataSourceResponse {
  export type AsObject = {
    result: string,
    configDefinition: string,
  }
}

export class DeleteDataSourceRequest extends jspb.Message {
  getConfigDefinition(): string;
  setConfigDefinition(value: string): DeleteDataSourceRequest;

  getDataSourceCode(): string;
  setDataSourceCode(value: string): DeleteDataSourceRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteDataSourceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteDataSourceRequest): DeleteDataSourceRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteDataSourceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteDataSourceRequest;
  static deserializeBinaryFromReader(message: DeleteDataSourceRequest, reader: jspb.BinaryReader): DeleteDataSourceRequest;
}

export namespace DeleteDataSourceRequest {
  export type AsObject = {
    configDefinition: string,
    dataSourceCode: string,
  }
}

export class DeleteDataSourceResponse extends jspb.Message {
  getResult(): string;
  setResult(value: string): DeleteDataSourceResponse;

  getConfigDefinition(): string;
  setConfigDefinition(value: string): DeleteDataSourceResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteDataSourceResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteDataSourceResponse): DeleteDataSourceResponse.AsObject;
  static serializeBinaryToWriter(message: DeleteDataSourceResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteDataSourceResponse;
  static deserializeBinaryFromReader(message: DeleteDataSourceResponse, reader: jspb.BinaryReader): DeleteDataSourceResponse;
}

export namespace DeleteDataSourceResponse {
  export type AsObject = {
    result: string,
    configDefinition: string,
  }
}

export class GetDataSourcesRequest extends jspb.Message {
  getConfigDefinition(): string;
  setConfigDefinition(value: string): GetDataSourcesRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetDataSourcesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetDataSourcesRequest): GetDataSourcesRequest.AsObject;
  static serializeBinaryToWriter(message: GetDataSourcesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetDataSourcesRequest;
  static deserializeBinaryFromReader(message: GetDataSourcesRequest, reader: jspb.BinaryReader): GetDataSourcesRequest;
}

export namespace GetDataSourcesRequest {
  export type AsObject = {
    configDefinition: string,
  }
}

export class GetDataSourcesResponse extends jspb.Message {
  getResult(): string;
  setResult(value: string): GetDataSourcesResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetDataSourcesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetDataSourcesResponse): GetDataSourcesResponse.AsObject;
  static serializeBinaryToWriter(message: GetDataSourcesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetDataSourcesResponse;
  static deserializeBinaryFromReader(message: GetDataSourcesResponse, reader: jspb.BinaryReader): GetDataSourcesResponse;
}

export namespace GetDataSourcesResponse {
  export type AsObject = {
    result: string,
  }
}

export class VerifyConfigRequest extends jspb.Message {
  getConfigDefinition(): string;
  setConfigDefinition(value: string): VerifyConfigRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VerifyConfigRequest.AsObject;
  static toObject(includeInstance: boolean, msg: VerifyConfigRequest): VerifyConfigRequest.AsObject;
  static serializeBinaryToWriter(message: VerifyConfigRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VerifyConfigRequest;
  static deserializeBinaryFromReader(message: VerifyConfigRequest, reader: jspb.BinaryReader): VerifyConfigRequest;
}

export namespace VerifyConfigRequest {
  export type AsObject = {
    configDefinition: string,
  }
}

export class VerifyConfigResponse extends jspb.Message {
  getResult(): boolean;
  setResult(value: boolean): VerifyConfigResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VerifyConfigResponse.AsObject;
  static toObject(includeInstance: boolean, msg: VerifyConfigResponse): VerifyConfigResponse.AsObject;
  static serializeBinaryToWriter(message: VerifyConfigResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VerifyConfigResponse;
  static deserializeBinaryFromReader(message: VerifyConfigResponse, reader: jspb.BinaryReader): VerifyConfigResponse;
}

export namespace VerifyConfigResponse {
  export type AsObject = {
    result: boolean,
  }
}

