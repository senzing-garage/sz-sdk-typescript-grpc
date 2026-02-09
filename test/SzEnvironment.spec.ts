import {
  SzGrpcConfig,
  SzGrpcEnvironment,
} from "../dist/@senzing/sz-sdk-typescript-grpc";

describe("SzEnvironment Tests", () => {
  const szEnvironment = new SzGrpcEnvironment({ isTestEnvironment: true });

  it("Can create SzEnvironment", () => {
    expect(szEnvironment).toBeInstanceOf(SzGrpcEnvironment);
  });
  it("Has getConfigManager method", () => {
    expect(typeof szEnvironment.getConfigManager).toBe("function");
  });
  it("Has getDiagnostic method", () => {
    expect(typeof szEnvironment.getDiagnostic).toBe("function");
  });
  it("Has getEngine method", () => {
    expect(typeof szEnvironment.getEngine).toBe("function");
  });
  it("Has getProduct method", () => {
    expect(typeof szEnvironment.getProduct).toBe("function");
  });
});
