import { SzAbstractFactory as szAbstractFactoryCreator } from '../../dist/@senzing/sz-sdk-typescript-grpc';

const SzAbstractFactory         = new szAbstractFactoryCreator(`0.0.0.0:8261`);
const szConfigManager           = SzAbstractFactory.createConfigManager();

szConfigManager.getDefaultConfigId().then((defaultConfigId) => {
    console.log(`Default Config Id: \n\r${defaultConfigId}`);
}).catch((err) => {
    console.error(err);
});