import { SzGrpcEnvironment } from '@senzing/sz-sdk-typescript-grpc';

const szEnvironment         = new SzGrpcEnvironment({connectionString: `0.0.0.0:8261`});

szEnvironment.configManager.getDefaultConfigId().then((currentDefaultConfigId) => {
    // create new config
    szEnvironment.configManager.getConfig(currentDefaultConfigId)?.then((currentConfigDefinition) => {
        szEnvironment.config.importConfig(currentConfigDefinition).then((currentConfigHandle) => {
            szEnvironment.config.addDataSource(currentConfigHandle as number, `REPLACE_DEFAULT_CONFIG_ID_${Date.toString()}`).then(() => {
                szEnvironment.config.exportConfig(currentConfigHandle as number).then((newConfigDefinition) => {
                    szEnvironment.configManager.addConfig(newConfigDefinition as string).then((newConfigId) => {
                        // replace config id
                        szEnvironment.configManager.replaceDefaultConfigId(currentDefaultConfigId, newConfigId);
                    })
                });
            })
        })
    })
}).catch((err) => {
    console.error(err);
});