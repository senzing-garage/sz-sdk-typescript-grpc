import { SzAbstractFactory as szAbstractFactoryCreator } from '../../dist/@senzing/sz-sdk-typescript-grpc';

const SzAbstractFactory         = new szAbstractFactoryCreator(`0.0.0.0:8261`);
const szConfig                  = SzAbstractFactory.createConfig();
const szConfigManager           = SzAbstractFactory.createConfigManager();

szConfigManager.getDefaultConfigId().then((currentDefaultConfigId) => {
    // create new config
    szConfigManager.getConfig(currentDefaultConfigId)?.then((currentConfigDefinition) => {
        szConfig.importConfig(currentConfigDefinition).then((currentConfigHandle) => {
            szConfig.addDataSource(currentConfigHandle as number, `REPLACE_DEFAULT_CONFIG_ID_${Date.toString()}`).then(() => {
                szConfig.exportConfig(currentConfigHandle as number).then((newConfigDefinition) => {
                    szConfigManager.addConfig(newConfigDefinition as string).then((newConfigId) => {
                        // replace config id
                        szConfigManager.replaceDefaultConfigId(currentDefaultConfigId, newConfigId);
                    })
                });
            })
        })
    })
}).catch((err) => {
    console.error(err);
});