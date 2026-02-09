import { SzGrpcEnvironment } from "@senzing/sz-sdk-typescript-grpc";

const szEnvironment = new SzGrpcEnvironment({
  connectionString: `0.0.0.0:8261`,
});

szEnvironment.engine
  .countRedoRecords()
  .then((result) => {
    console.log(`Redo Records: ${result}`);
  })
  .catch((err) => {
    console.error(err);
  });
