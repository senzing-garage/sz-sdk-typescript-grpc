import { SzGrpcConfig, SzGrpcEnvironment } from "../dist/@senzing/sz-sdk-typescript-grpc";

describe('SzConfig Tests', () => {
    const szEnvironment  = new SzGrpcEnvironment({isTestEnvironment: true});
    let szConfig: SzGrpcConfig;

    async function GetConfig() {
        return new Promise<SzGrpcConfig>((resolve, reject) => {
            szEnvironment.getConfigManager().createConfig().then((conf: SzGrpcConfig) => {
                szConfig = conf;
                resolve(conf);
            }).catch((err) => {
                throw err;
            })
        });
    }

    beforeAll(async () => {
        await GetConfig();
    });

    it("Can create SzConfig", () => {
        expect(szConfig).toHaveProperty('productId');
    });
    it("Has correct product id", () => {
        expect(szConfig.productId).toBe('5050');
    });
})
