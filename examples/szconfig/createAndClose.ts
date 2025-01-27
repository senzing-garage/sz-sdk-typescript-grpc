import { SzEnvironment } from '@senzing/sz-sdk-typescript-grpc';

const szEnvironment         = new SzEnvironment({connectionString: `0.0.0.0:8261`});
// create new config and get handle
szEnvironment.config.createConfig().then((configHandle) => {
    
    console.log(`CONFIG #${configHandle}`);

    szEnvironment.config.closeConfig(configHandle as number);
}).catch((err) => {
    console.error(err);
})