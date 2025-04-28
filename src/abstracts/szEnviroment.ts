import { SzProduct } from "./szProduct";
import { SzConfig } from "./szConfig";
import { SzConfigManager } from "./szConfigManager";
import { SzDiagnostic } from "./szDiagnostic";
import { SzEngine } from "./szEngine";

export interface SzEnvironmentOptions {}
export abstract class SzEnvironmentOptions {

}

export abstract class SzEnvironment {
    // these internal properties store either the core or grpc instances of the
    // concrete modules in the derived classes
    protected abstract _configManager: SzConfigManager | undefined;
    protected abstract _diagnostic: SzDiagnostic | undefined;
    protected abstract _engine: SzEngine | undefined;
    protected abstract _product: SzProduct | undefined;

    public abstract getConfigManager(): SzConfigManager;
    public abstract getDiagnostic(): SzDiagnostic;
    public abstract getEngine(): SzEngine;
    public abstract getProduct(): SzProduct;

    constructor(parameters: SzEnvironmentOptions) { 
        return; 
    }
}
