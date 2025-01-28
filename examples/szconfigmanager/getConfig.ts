import { SzGrpcEnvironment } from '@senzing/sz-sdk-typescript-grpc';

const szEnvironment         = new SzGrpcEnvironment({connectionString: `0.0.0.0:8261`});

szEnvironment.configManager.getDefaultConfigId().then((configId: number) => {
    szEnvironment.configManager.getConfig(configId).then((configList) => {
        console.log(`Config: \n\r${configList}`);
    }).catch((err) => {
        console.error(err);
    });
})
