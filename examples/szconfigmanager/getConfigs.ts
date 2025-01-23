import { SzAbstractFactory as szAbstractFactoryCreator, SzAbstractFactoryOptions, SzEngineFlags } from '../../dist/@senzing/sz-sdk-typescript-grpc';

const SzAbstractFactory         = new szAbstractFactoryCreator(`0.0.0.0:8261`);
const szConfigManager           = SzAbstractFactory.createConfigManager();

szConfigManager.getConfigs().then((configList) => {
    console.log(`Config List: \n\r${configList}`);
}).catch((err) => {
    console.error(err);
});