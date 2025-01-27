import { SzAbstractProduct } from "./szAbstractProduct";
import { SzAbstractConfig } from "./szAbstractConfig";
import { SzAbstractConfigManager } from "./szAbstractConfigManager";
import { SzAbstractDiagnostic } from "./szAbstractDiagnostic";
import { SzAbstractEngine } from "./szAbstractEngine";

export interface SzAbstractEnvironmentOptions {}
export abstract class SzAbstractEnvironmentOptions {

}

export abstract class SzAbstractEnvironment {
    // these internal properties store either the core or grpc instances of the
    // concrete modules in the derived classes
    protected abstract _config: SzAbstractConfig | undefined;
    protected abstract _configManager: SzAbstractConfigManager | undefined;
    protected abstract _diagnostic: SzAbstractDiagnostic | undefined;
    protected abstract _engine: SzAbstractEngine | undefined;
    protected abstract _product: SzAbstractProduct | undefined;

    public abstract getConfig(): SzAbstractConfig;
    public abstract getConfigManager(): SzAbstractConfigManager;
    public abstract getDiagnostic(): SzAbstractDiagnostic;
    public abstract getEngine(): SzAbstractEngine;
    public abstract getProduct(): SzAbstractProduct;

    constructor(parameters: SzAbstractEnvironmentOptions) { 
        return; 
    }
}
