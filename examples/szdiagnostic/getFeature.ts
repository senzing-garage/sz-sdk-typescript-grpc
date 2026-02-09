import { SzGrpcEnvironment } from "@senzing/sz-sdk-typescript-grpc";

const szEnvironment = new SzGrpcEnvironment({
  connectionString: `0.0.0.0:8261`,
});
const FEATURE_ID = 1;

szEnvironment.diagnostic
  .getFeature(FEATURE_ID)
  .then((resp) => {
    console.log(`FEATURE #${FEATURE_ID}:\n${resp}`);
  })
  .catch((err) => {
    console.error(err);
  });
