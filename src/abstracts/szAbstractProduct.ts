
// ---------------  abstract product from main package
export interface SzAbstractProduct {
    getLicense(): Promise<{[key: string]: any} | Error> | undefined;
    getVersion(): Promise<{[key: string]: any} | Error> | undefined;
}