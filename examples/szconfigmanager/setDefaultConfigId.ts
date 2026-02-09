import {
  SzGrpcConfigManager,
  SzGrpcEnvironment,
  SzError,
  SzGrpcConfig,
} from "@senzing/sz-sdk-typescript-grpc";

// obtain the SzEnvironment (varies by application)
const szEnvironment = new SzGrpcEnvironment({
  connectionString: `0.0.0.0:8261`,
});

// get the SzConfigManager instance
const configMgr: SzGrpcConfigManager = szEnvironment.configManager;

// create the config with datasources
configMgr
  .createConfig()
  .then((config: SzGrpcConfig) => {
    // add datasources to config
    config.addDataSources(["WATCHLIST"]).then((datasources) => {
      // get the configuration ID (varies by application)
      configMgr.registerConfig(config.definition).then((configId) => {
        // set the default config (using an auto-generated comment)
        configMgr
          .setDefaultConfigId(configId)
          .then(() => {
            console.log("Set default configuration ID to ${configId}");
          })
          .catch((err: SzError) => {
            console.log(`"Failed to set default configuration ID."`, err);
          });
      });
    });
  })
  .catch((error: SzError) => {
    console.log(`Failed to set default configuration.`, error);
  });
