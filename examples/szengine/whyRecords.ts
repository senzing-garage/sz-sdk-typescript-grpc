import { SzAbstractFactory as szAbstractFactoryCreator, SzAbstractFactoryOptions, SzEngineFlags } from '../../dist/@senzing/sz-sdk-typescript-grpc';

const SzAbstractFactory         = new szAbstractFactoryCreator(`0.0.0.0:8261`);
const szEngine                  = SzAbstractFactory.createEngine();

szEngine.whyRecords(
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