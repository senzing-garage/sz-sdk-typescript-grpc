import { SzEnvironment, SzEngineFlags } from '@senzing/sz-sdk-typescript-grpc';

const szEnvironment  = new SzEnvironment({connectionString: `0.0.0.0:8261`});

szEnvironment.engine.getActiveConfigId().then((result) => {
    console.log(`RESULT: ${result}`);
}).catch((err) => {
    console.error(err);
})