import { SzGrpcConfigManager, SzGrpcEnvironment, SzError } from '@senzing/sz-sdk-typescript-grpc';

// obtain the SzEnvironment (varies by application)
const szEnvironment         = new SzGrpcEnvironment({connectionString: `0.0.0.0:8261`});

// get the SzConfigManager instance
const configMgr: SzGrpcConfigManager = szEnvironment.configManager;

// create the config from the template
configMgr.createConfig().then((config) => {
    // do something with the SzConfig
    console.log(config.definition);
    if(!config || config === undefined) {
        throw new Error();
    }
}).catch((error: SzError) => {
    console.log(`Failed to create new SzConfig from the template.`, error);
})
