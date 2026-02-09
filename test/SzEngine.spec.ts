import {
  SzGrpcEngine,
  SzGrpcEnvironment,
} from "../dist/@senzing/sz-sdk-typescript-grpc";

describe("SzEngine Tests", () => {
  const szEnvironment = new SzGrpcEnvironment({ isTestEnvironment: true });
  let szEngine: SzGrpcEngine;

  beforeAll(() => {
    szEngine = szEnvironment.getEngine();
  });

  it("Can create SzEngine", () => {
    expect(szEngine).toHaveProperty("productId");
  });
  it("Has correct product id", () => {
    expect(szEngine.productId).toBe("5053");
  });
});
