import { SzEnvironment } from '@senzing/sz-sdk-typescript-grpc';

const szEnvironment         = new SzEnvironment({connectionString: `0.0.0.0:8261`});

szEnvironment.config.createConfig().then((configHandle) => {
    szEnvironment.config.exportConfig(configHandle as number).then((configDefinition) => {
        szEnvironment.configManager.addConfig(JSON.stringify(configDefinition));
    }).catch((err) => {
        throw err;
    })
}).catch((err) => {
    console.error(err);
});