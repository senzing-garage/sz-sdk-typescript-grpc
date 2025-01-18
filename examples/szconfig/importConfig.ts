import { SzAbstractFactory, SzAbstractFactoryOptions } from '../../dist/@senzing/sz-sdk-typescript-grpc';

const szParamFactory = new SzAbstractFactory(`0.0.0.0:8261`);
const szConfig      = szParamFactory.createConfig();
const szConfigMgr   = szParamFactory.createConfigManager();

// first get default config id from config manager
//await szConfigMgr.getDefaultConfigId();

// create new config and get handle #1
/*
szConfig.createConfig().then((configHandle1) => {
    
    szConfig.exportConfig(configHandle1 as number).then((CONFIG_DEFINITION) => {
        // now create new config from exported config
        szConfig.importConfig(CONFIG_DEFINITION as string).then((configHandle2) => {
            console.log('CONFIG #1: ', configHandle1);
            console.log('CONFIG #2: ', configHandle2);
            console.log('CONFIG #1 DEF: \n', CONFIG_DEFINITION);
        }).catch((err) => {
            szConfig.closeConfig(configHandle1 as number); // make sure config is closed even if error
        })
    }).catch((err) => {
        szConfig.closeConfig(configHandle1 as number); // make sure config is closed even if error
    })
}).catch((err) => {
    console.error(err);
})
*/