import { SzEnvironment, SzEngineFlags } from '@senzing/sz-sdk-typescript-grpc';

const szEnvironment  = new SzEnvironment({connectionString: `0.0.0.0:8261`});

szEnvironment.engine.deleteRecord("TEST", "1", SzEngineFlags.SZ_WITH_INFO).then((result) => {
    console.log(`Redo Records: ${result}`);
}).catch((err) => {
    console.error(err);
})