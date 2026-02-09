import {
  SzGrpcDiagnostic,
  SzGrpcEnvironment,
} from "../dist/@senzing/sz-sdk-typescript-grpc";

describe("SzDiagnostic Tests", () => {
  const szEnvironment = new SzGrpcEnvironment({ isTestEnvironment: true });
  let szDiagnostic: SzGrpcDiagnostic;

  beforeAll(() => {
    szDiagnostic = szEnvironment.getDiagnostic();
  });

  it("Can create SzConfig", () => {
    expect(szDiagnostic).toHaveProperty("productId");
  });
  it("Has correct product id", () => {
    expect(szDiagnostic.productId).toBe("5052");
  });
});
