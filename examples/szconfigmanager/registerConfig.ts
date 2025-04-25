import { SzGrpcConfigManager, SzGrpcEnvironment, SzError, SzGrpcConfig } from '@senzing/sz-sdk-typescript-grpc';


// obtain the SzEnvironment (varies by application)
const szEnvironment         = new SzGrpcEnvironment({connectionString: `0.0.0.0:8261`});

// get the SzConfigManager instance
const configMgr: SzGrpcConfigManager = szEnvironment.configManager;

// create the config with datasources
configMgr.createConfig().then((config: SzGrpcConfig) => {
    // add datasources to config
    config.addDataSources(["EMPLOYEES"]).then((datasources) => {
        configMgr.registerConfig(config.definition).then((configId: number) => {
            if(configId < 0) {
                throw new Error();
            }
        })
    })
}).catch((error: SzError) => {
    console.log(`Failed to create new SzConfig from the template.`, error);
})