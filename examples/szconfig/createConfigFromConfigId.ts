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

// get a valid configuration ID (will vary by application)
configMgr.getDefaultConfigId().then((CONFIG_ID) => {
  configMgr
    .createConfig(CONFIG_ID)
    .then((result) => {
      // do something with the SzConfig
      if (!result || result === undefined) {
        throw new Error();
      }
    })
    .catch((error: SzError) => {
      console.log(`Failed to create new SzConfig from ${CONFIG_ID}.`, error);
    });
});
