import { SzGrpcEnvironment } from '@senzing/sz-sdk-typescript-grpc';

const szEnvironment         = new SzGrpcEnvironment({connectionString: `0.0.0.0:8261`});

Promise.all([
    szEnvironment.getActiveConfigId(),
    szEnvironment.configManager.getDefaultConfigId()
]).then((results) => {
    let activeConfigId  = results[0];
    let defaultConfigId = results[1];
    if (activeConfigId != defaultConfigId) {
        // reinitialize the environment with the default config ID                    
        szEnvironment.reinitialize(defaultConfigId); // @highlight regex="env.*"
    }
})