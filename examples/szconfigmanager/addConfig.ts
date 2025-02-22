import { SzGrpcEnvironment } from '@senzing/sz-sdk-typescript-grpc';

const szEnvironment         = new SzGrpcEnvironment({connectionString: `0.0.0.0:8261`});

szEnvironment.config.createConfig().then((configHandle) => {
    szEnvironment.config.exportConfig(configHandle as number).then((configDefinition) => {
        szEnvironment.configManager.addConfig(configDefinition as string).then((configId: number) => {
            console.log(`new config #:\n\r`, configId);
        });
    }).catch((err) => {
        throw err;
    })
}).catch((err) => {
    console.error(err);
});