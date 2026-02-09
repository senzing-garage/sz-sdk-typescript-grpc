import {
  SzGrpcConfigManager,
  SzGrpcEnvironment,
  SzError,
} from "@senzing/sz-sdk-typescript-grpc";

// obtain the SzEnvironment (varies by application)
const szEnvironment = new SzGrpcEnvironment({
  connectionString: `0.0.0.0:8261`,
});

// get the SzConfigManager instance
const configMgr: SzGrpcConfigManager = szEnvironment.configManager;

/**
 * Simulates reading a config file from somewhere.
 *
 * @return The config definition JSON.
 */
let readConfigFile = () => {
  let env = szEnvironment;
  let configMgr = env.getConfigManager();

  return new Promise<string>((resolve, reject) => {
    configMgr.createConfig().then((config) => {
      resolve(config.definition);
    });
  });
};

// obtain a JSON config definition (varies by application)
readConfigFile().then((configDefinition) => {
  // create the config using the config definition
  configMgr
    .createConfig(configDefinition)
    .then((config) => {
      console.log(`config: `, config.definition);
      // do something with the SzConfig
      if (!config || config === undefined) {
        throw new Error();
      }
    })
    .catch((error: SzError) => {
      console.log(
        `Failed to create new SzConfig from the config definition.`,
        error,
      );
    });
});
