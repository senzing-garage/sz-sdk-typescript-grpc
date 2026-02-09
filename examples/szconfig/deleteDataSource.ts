import {
  SzGrpcConfig,
  SzGrpcEnvironment,
} from "@senzing/sz-sdk-typescript-grpc";

const szEnvironment = new SzGrpcEnvironment({
  connectionString: `0.0.0.0:8261`,
});
const DATA_SOURCE_CODE = "NAME_OF_DATASOURCE";

// create new config and get handle
szEnvironment.configManager
  .createConfig()
  .then((config: SzGrpcConfig) => {
    // now get datasources from config
    config
      .deleteDataSource(DATA_SOURCE_CODE)
      .then(() => {
        // just for debug lets list out datasources
        config
          .getDataSources()
          .then((result) => {
            console.log("DATA SOURCES:\n\r", result);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  })
  .catch((err) => {
    console.error(err);
  });
