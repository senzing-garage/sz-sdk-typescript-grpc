import { SzAbstractFactory, SzAbstractFactoryOptions } from '../../dist/@senzing/sz-sdk-typescript-grpc';

const szParamFactory    = new SzAbstractFactory(`0.0.0.0:8261`);
const szConfig          = szParamFactory.createConfig();

// create new config and get handle
szConfig.createConfig().then((configHandle) => {
    console.log(`CONFIG #${configHandle}`);
}).catch((err) => {
    console.error(err);
})