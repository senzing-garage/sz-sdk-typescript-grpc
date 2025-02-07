import { SzGrpcEnvironment, SzGrpcProduct } from "../dist/@senzing/sz-sdk-typescript-grpc";

describe('SzProduct Tests', () => {
    const szEnvironment  = new SzGrpcEnvironment({isTestEnvironment: true});
    let szProduct: SzGrpcProduct;

    beforeAll(() => {
        szProduct = szEnvironment.getProduct();
    });

    it("Can create SzProduct", () => {
        expect(szProduct).toHaveProperty('productId');
    });
    it("Has correct product id", () => {
        expect(szProduct.productId).toBe('5056');
    });
})
