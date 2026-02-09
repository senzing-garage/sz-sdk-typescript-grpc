import { SzGrpcEnvironment } from "@senzing/sz-sdk-typescript-grpc";

const szEnvironment = new SzGrpcEnvironment({
  connectionString: `0.0.0.0:8261`,
});

// create new config and get handle #1
szEnvironment.configManager
  .createConfig()
  .then((config) => {
    // export config def
    const CONFIG_DEFINITION = config.definition;
    console.log(`CONFIG DEFINITION:\n${CONFIG_DEFINITION}`);
  })
  .catch((err) => {
    console.error(err);
  });
