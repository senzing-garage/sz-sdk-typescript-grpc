import { ServiceError } from "@grpc/grpc-js";
import { SzError } from "../senzing/SzError";

// ---------------  abstract config from main package
export interface SzConfigManager {
    //addConfig(configDefinition: string): Promise<number | SzError> | undefined;
    //getConfig(configId: number): Promise<string | SzError> | undefined;
    getConfigs(): Promise<string | SzError> | undefined;
    getDefaultConfigId(): Promise<number | SzError> | undefined;
    setDefaultConfigId(configId: number): void;
    replaceDefaultConfigId(currentDefaultConfigId: number, newDefaultConfigId: number): void;
}