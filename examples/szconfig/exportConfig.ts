import { SzGrpcEnvironment } from '@senzing/sz-sdk-typescript-grpc';

const szEnvironment         = new SzGrpcEnvironment({connectionString: `0.0.0.0:8261`});

// create new config and get handle #1
szEnvironment.config.createConfig().then((configHandle) => {
    // export config def
    szEnvironment.config.exportConfig(configHandle as number).then((CONFIG_DEFINITION) => {
        console.log(`CONFIG DEFINITION:\n${CONFIG_DEFINITION}`);
    }).finally(() => {
        szEnvironment.config.closeConfig(configHandle as number); // make sure config is closed even if error
    })
}).catch((err) => {
    console.error(err);
})