import { SzGrpcEnvironment } from '@senzing/sz-sdk-typescript-grpc';

const szEnvironment         = new SzGrpcEnvironment({connectionString: `0.0.0.0:8261`});

// create new config and get handle
szEnvironment.config.createConfig().then((configHandle) => {
    console.log(`CONFIG #${configHandle}`);
}).catch((err) => {
    console.error(err);
})