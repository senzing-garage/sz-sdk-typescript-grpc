import {
  SzGrpcEnvironment,
  SzEngineFlags,
} from "@senzing/sz-sdk-typescript-grpc";

const szEnvironment = new SzGrpcEnvironment({
  connectionString: `0.0.0.0:8261`,
});

szEnvironment.engine
  .findPathByRecordId(
    "CUSTOMERS",
    "1001",
    "CUSTOMERS",
    "1009",
    2,
    [],
    [],
    SzEngineFlags.SZ_FIND_NETWORK_DEFAULT_FLAGS,
  )
  .then((result) => {
    console.log(`RESULT: ${result}`);
  })
  .catch((err) => {
    console.error(err);
  });
