import { SzGrpcEnvironment, SzEngineFlags } from '@senzing/sz-sdk-typescript-grpc';

const szEnvironment  = new SzGrpcEnvironment({connectionString: `0.0.0.0:8261`});
const RECORD_LIST:[string, string | number][] = [
    ["CUSTOMERS", "1001"],
    ["CUSTOMERS", "1002"],
]

szEnvironment.engine.getVirtualEntityByRecordId(RECORD_LIST, SzEngineFlags.SZ_VIRTUAL_ENTITY_DEFAULT_FLAGS).then((result) => {
    console.log(`RESULT: ${result}`);
}).catch((err) => {
    console.error(err);
})