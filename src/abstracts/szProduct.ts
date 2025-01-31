
// ---------------  abstract product from main package
export interface SzProduct {
    getLicense(): Promise<{[key: string]: any} | Error> | undefined;
    getVersion(): Promise<{[key: string]: any} | Error> | undefined;
}