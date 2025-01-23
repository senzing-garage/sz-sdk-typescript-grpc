import { SzAbstractFactory as szAbstractFactoryCreator } from '../../dist/@senzing/sz-sdk-typescript-grpc';

const SzAbstractFactory         = new szAbstractFactoryCreator(`0.0.0.0:8261`);
const szConfig                  = SzAbstractFactory.createConfig();
const szConfigManager           = SzAbstractFactory.createConfigManager();

szConfigManager.getDefaultConfigId().then((oldConfigId)=> {
    // create new config
    szConfigManager.getConfig(oldConfigId).then((oldConfigDefinition) => {
        szConfig.importConfig(oldConfigDefinition).then((oldConfigHandle) => {
            szConfig.addDataSource(oldConfigHandle as number, `REPLACE_DEFAULT_CONFIG_ID_${Date.toString()}`).then(()=> {
                szConfig.exportConfig(oldConfigHandle as number).then((newConfigDefinition) => {
                    szConfigManager.addConfig(newConfigDefinition as string).then((newConfigId) => {
                        // replace config id
                        szConfigManager.setDefaultConfigId(newConfigId);
                    })
                });
            })
        })
    })
})