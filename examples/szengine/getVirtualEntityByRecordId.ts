import { SzAbstractFactory as szAbstractFactoryCreator, SzAbstractFactoryOptions, SzEngineFlags } from '../../dist/@senzing/sz-sdk-typescript-grpc';

const SzAbstractFactory         = new szAbstractFactoryCreator(`0.0.0.0:8261`);
const szEngine                  = SzAbstractFactory.createEngine();
const RECORD_LIST:[string, string | number][] = [
    ["CUSTOMERS", "1001"],
    ["CUSTOMERS", "1002"],
]

szEngine.getVirtualEntityByRecordId(RECORD_LIST, SzEngineFlags.SZ_VIRTUAL_ENTITY_DEFAULT_FLAGS).then((result) => {
    console.log(`RESULT: ${result}`);
}).catch((err) => {
    console.error(err);
})