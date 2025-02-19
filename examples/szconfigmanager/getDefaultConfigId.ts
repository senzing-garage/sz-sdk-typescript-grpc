import { SzGrpcEnvironment } from '@senzing/sz-sdk-typescript-grpc';

const szEnvironment         = new SzGrpcEnvironment({connectionString: `0.0.0.0:8261`});

szEnvironment.configManager.getDefaultConfigId().then((defaultConfigId) => {
    console.log(`Default Config Id: \n\r${defaultConfigId}`);
}).catch((err) => {
    console.error(err);
});