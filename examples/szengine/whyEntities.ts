import {
  SzGrpcEnvironment,
  SzEngineFlags,
} from "@senzing/sz-sdk-typescript-grpc";

const szEnvironment = new SzGrpcEnvironment({
  connectionString: `0.0.0.0:8261`,
});

szEnvironment.engine
  .whyEntities(1, 4, SzEngineFlags.SZ_SEARCH_BY_ATTRIBUTES_DEFAULT_FLAGS)
  .then((result) => {
    console.log(`RESULT: ${result}`);
  })
  .catch((err) => {
    console.error(err);
  });
