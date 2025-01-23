import { SzAbstractFactory as szAbstractFactoryCreator, SzAbstractFactoryOptions, SzEngineFlags } from '../../dist/@senzing/sz-sdk-typescript-grpc';

const SzAbstractFactory         = new szAbstractFactoryCreator(`0.0.0.0:8261`);
const szConfig                  = SzAbstractFactory.createConfig();
const szConfigManager           = SzAbstractFactory.createConfigManager();

szConfig.createConfig().then((configHandle) => {
    szConfig.exportConfig(configHandle as number).then((configDefinition) => {
        szConfigManager.addConfig(JSON.stringify(configDefinition));
    }).catch((err) => {
        throw err;
    })
}).catch((err) => {
    console.error(err);
});