
// ---------------  abstract diagnostic from main package
export interface SzDiagnostic {
    checkDataStorePerformance(secondsToRun: number): void;
    getDatastoreInfo(): void;
    getFeature(featureId: number): void;
    purgeRepository(): void;
    reinitialize(configId: number): void;
}