import {
  SzGrpcConfigManager,
  SzGrpcEnvironment,
} from "../dist/@senzing/sz-sdk-typescript-grpc";

describe("SzConfigManager Tests", () => {
  const szEnvironment = new SzGrpcEnvironment({ isTestEnvironment: true });
  let szConfigManager: SzGrpcConfigManager;

  beforeAll(() => {
    szConfigManager = szEnvironment.getConfigManager();
  });

  it("Can create SzConfig", () => {
    expect(szConfigManager).toHaveProperty("productId");
  });
  it("Has correct product id", () => {
    expect(szConfigManager.productId).toBe("5051");
  });
});
