import { SzGrpcEnvironment } from '@senzing/sz-sdk-typescript-grpc';

const szEnvironment         = new SzGrpcEnvironment({connectionString: `0.0.0.0:8261`});

// create new config and get handle #1
szEnvironment.config.createConfig().then((configHandle1) => {
    // export config def
    szEnvironment.config.exportConfig(configHandle1 as number).then((CONFIG_DEFINITION) => {
        // now create new config from exported config
        szEnvironment.config.importConfig(CONFIG_DEFINITION as string).then((configHandle2) => {
            console.log('CONFIG #1: ', configHandle1);
            console.log('CONFIG #2: ', configHandle2);
            console.log('CONFIG #1 DEF: \n', CONFIG_DEFINITION);
        }).catch((err) => {
            szEnvironment.config.closeConfig(configHandle1 as number); // make sure config is closed even if error
        })
    }).catch((err) => {
        szEnvironment.config.closeConfig(configHandle1 as number); // make sure config is closed even if error
    })
}).catch((err) => {
    console.error(err);
})