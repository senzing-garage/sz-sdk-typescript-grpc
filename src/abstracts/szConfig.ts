import { ServiceError } from "@grpc/grpc-js";
import { SzError } from "../senzing/SzError";
import { ADD_DATASOURCE_RESPONSE } from "../types/szConfig";

// ---------------  abstract config from main package
export interface SzConfig {
    definition: string;
    registerDataSource(dataSourceCode: string): Promise<string | SzError>;
    //closeConfig(configHandle: number): Promise<unknown | SzError>;
    //createConfig(): Promise<number | SzError>;
    unregisterDataSource(dataSourceCode: string): Promise<any | SzError>;
    //exportConfig(configHandle: number): Promise<any | ServiceError>;
    getDataSourceRegistry(): Promise<any | ServiceError>;
    //importConfig(configDefinition: string): Promise<any | ServiceError>;
    verifyConfig(): Promise<any | ServiceError>;
}