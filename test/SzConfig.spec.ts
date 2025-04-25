import { SzGrpcConfig, SzGrpcEnvironment } from "../dist/@senzing/sz-sdk-typescript-grpc";

describe('SzConfig Tests', () => {
    const szEnvironment  = new SzGrpcEnvironment({isTestEnvironment: true});
    let szConfig: SzGrpcConfig;

    beforeAll(() => {
        return new Promise<SzGrpcConfig>((resolve, reject) => {
            szEnvironment.getConfigManager().createConfig().then((conf: SzGrpcConfig) => {
                szConfig = conf;
                resolve(conf);
            }).catch((err) => {
                reject(err);
                throw err;
            })
        });
    }, 10000);

    it("Can create SzConfig", () => {
        expect(szConfig).toHaveProperty('productId');
    });
    it("Has correct product id", () => {
        expect(szConfig.productId).toBe('5050');
    });
})
