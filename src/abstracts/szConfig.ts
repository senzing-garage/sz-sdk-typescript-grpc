import { ServiceError } from "@grpc/grpc-js";
import { SzError } from "../senzing/SzError";
import { ADD_DATASOURCE_RESPONSE } from "../types/szConfig";

// ---------------  abstract config from main package
export interface SzConfig {
    definition: string;
    addDataSource(dataSourceCode: string): Promise<string | SzError>;
    //closeConfig(configHandle: number): Promise<unknown | SzError>;
    //createConfig(): Promise<number | SzError>;
    deleteDataSource(dataSourceCode: string): Promise<any | SzError>;
    //exportConfig(configHandle: number): Promise<any | ServiceError>;
    getDataSources(): Promise<any | ServiceError>;
    //importConfig(configDefinition: string): Promise<any | ServiceError>;
    verifyConfig(): Promise<any | ServiceError>;
}