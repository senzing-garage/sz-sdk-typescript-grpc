import { SzEnvironment, SzEngineFlags } from '@senzing/sz-sdk-typescript-grpc';

const szEnvironment  = new SzEnvironment({connectionString: `0.0.0.0:8261`});

szEnvironment.engine.whyRecords(
    "CUSTOMERS",
    "1001",
    "CUSTOMERS",
    "1002",
    SzEngineFlags.SZ_WHY_ENTITIES_DEFAULT_FLAGS,
).
then((result) => {
    console.log(`RESULT: ${result}`);
}).catch((err) => {
    console.error(err);
})