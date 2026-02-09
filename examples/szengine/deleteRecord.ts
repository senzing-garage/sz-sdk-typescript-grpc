import {
  SzGrpcEnvironment,
  SzEngineFlags,
} from "@senzing/sz-sdk-typescript-grpc";

const szEnvironment = new SzGrpcEnvironment({
  connectionString: `0.0.0.0:8261`,
});

szEnvironment.engine
  .deleteRecord("TEST", "1", SzEngineFlags.SZ_WITH_INFO)
  .then((result) => {
    console.log(`Deleted Record: ${result}`);
  })
  .catch((err) => {
    console.error(err);
  });
