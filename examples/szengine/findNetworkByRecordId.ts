import {
  SzGrpcEnvironment,
  SzEngineFlags,
} from "@senzing/sz-sdk-typescript-grpc";

const szEnvironment = new SzGrpcEnvironment({
  connectionString: `0.0.0.0:8261`,
});

const BUILD_OUT_DEGREES = 1;
const MAX_DEGREES = 2;
const MAX_ENTITIES = 10;
const RECORDS: [string, string | number][] = [
  ["CUSTOMERS", "1001"],
  ["CUSTOMERS", "1009"],
];

szEnvironment.engine
  .findNetworkByRecordId(
    RECORDS,
    MAX_DEGREES,
    BUILD_OUT_DEGREES,
    MAX_ENTITIES,
    SzEngineFlags.SZ_FIND_NETWORK_DEFAULT_FLAGS,
  )
  .then((result) => {
    console.log(`RESULT: ${result}`);
  })
  .catch((err) => {
    console.error(err);
  });
