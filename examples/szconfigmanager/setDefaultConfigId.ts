import { SzGrpcEnvironment } from '@senzing/sz-sdk-typescript-grpc';

const szEnvironment         = new SzGrpcEnvironment({connectionString: `0.0.0.0:8261`});

szEnvironment.configManager.getDefaultConfigId().then((oldConfigId)=> {
    // create new config
    szEnvironment.configManager.getConfig(oldConfigId).then((oldConfigDefinition) => {
        szEnvironment.config.importConfig(oldConfigDefinition).then((oldConfigHandle) => {
            szEnvironment.config.addDataSource(oldConfigHandle as number, `REPLACE_DEFAULT_CONFIG_ID_${Date.toString()}`).then(()=> {
                szEnvironment.config.exportConfig(oldConfigHandle as number).then((newConfigDefinition) => {
                    szEnvironment.configManager.addConfig(newConfigDefinition as string).then((newConfigId) => {
                        // replace config id
                        szEnvironment.configManager.setDefaultConfigId(newConfigId);
                    })
                });
            })
        })
    })
})