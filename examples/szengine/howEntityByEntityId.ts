import { SzGrpcEnvironment, SzEngineFlags } from '@senzing/sz-sdk-typescript-grpc';

const szEnvironment  = new SzGrpcEnvironment({connectionString: `0.0.0.0:8261`});

szEnvironment.engine.howEntityByEntityId(1, SzEngineFlags.SZ_HOW_ENTITY_DEFAULT_FLAGS).then((result) => {
    console.log(`RESULT: ${result}`);
}).catch((err) => {
    console.error(err);
})