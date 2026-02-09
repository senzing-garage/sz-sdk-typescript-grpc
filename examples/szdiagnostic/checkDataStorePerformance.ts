import { SzGrpcEnvironment } from "@senzing/sz-sdk-typescript-grpc";

const szEnvironment = new SzGrpcEnvironment({
  connectionString: `0.0.0.0:8261`,
});

// create new config and get handle #1
szEnvironment.diagnostic
  .checkDataStorePerformance(3)
  .then((resp) => {
    console.log(
      `DATA STORE PERFORMANCE:\n`,
      JSON.stringify(resp, undefined, 4),
    );
  })
  .catch((err) => {
    console.error(err);
  });
