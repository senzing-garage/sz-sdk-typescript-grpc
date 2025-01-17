
// ---------------  abstract diagnostic from main package
export interface SzAbstractDiagnostic {
    checkDataStorePerformance(secondsToRun: number): void;
    getDatastoreInfo(): void;
    getFeature(featureId: number): void;
    purgeRepository(): void;
    reinitialize(configId: number): void;
}