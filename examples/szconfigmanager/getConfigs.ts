import { SzGrpcEnvironment } from '@senzing/sz-sdk-typescript-grpc';

const szEnvironment         = new SzGrpcEnvironment({connectionString: `0.0.0.0:8261`});

szEnvironment.configManager.getConfigs().then((configList) => {
    console.log(`Config List: \n\r${configList}`);
}).catch((err) => {
    console.error(err);
});