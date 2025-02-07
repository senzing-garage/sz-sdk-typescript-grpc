import { SzGrpcConfig, SzGrpcEnvironment } from "../dist/@senzing/sz-sdk-typescript-grpc";

describe('SzConfig Tests', () => {
    const szEnvironment  = new SzGrpcEnvironment({isTestEnvironment: true});
    let szConfig: SzGrpcConfig;

    beforeAll(() => {
        szConfig = szEnvironment.getConfig();
    });

    it("Can create SzConfig", () => {
        expect(szConfig).toHaveProperty('productId');
    });
    it("Has correct product id", () => {
        expect(szConfig.productId).toBe('5050');
    });
})
