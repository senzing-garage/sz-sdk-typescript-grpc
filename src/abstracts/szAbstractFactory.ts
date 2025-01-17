import { SzAbstractProduct } from "./szAbstractProduct";
import { SzAbstractConfig } from "./szAbstractConfig";
import { SzAbstractConfigManager } from "./szAbstractConfigManager";
import { SzAbstractDiagnostic } from "./szAbstractDiagnostic";
import { SzAbstractEngine } from "./szAbstractEngine";

// --------------- this factory would normally come from core/native
export abstract class SzAbstractFactory {
    constructor() { return; }
    abstract createConfig(factory: any): SzAbstractConfig | undefined;
    abstract createConfigManager(factory: any): SzAbstractConfigManager | undefined;
    abstract createDiagnostic(): SzAbstractDiagnostic | undefined;
    abstract createEngine(): SzAbstractEngine | undefined;
    abstract createProduct(factory: any): SzAbstractProduct | undefined;
}
