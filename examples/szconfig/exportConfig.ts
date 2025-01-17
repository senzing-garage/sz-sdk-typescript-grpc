import { SzAbstractFactory, SzAbstractFactoryOptions } from '../../dist/@senzing/sz-sdk-nodejs-grpc';

const szParamFactory = new SzAbstractFactory(`0.0.0.0:8261`);
const szConfig      = szParamFactory.createConfig();

// create new config and get handle #1
szConfig.createConfig().then((configHandle) => {
    // export config def
    szConfig.exportConfig(configHandle as number).then((CONFIG_DEFINITION) => {
        console.log(`CONFIG DEFINITION:\n${CONFIG_DEFINITION}`);
    }).finally(() => {
        szConfig.closeConfig(configHandle as number); // make sure config is closed even if error
    })
}).catch((err) => {
    console.error(err);
})