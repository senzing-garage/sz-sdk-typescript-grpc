import { SzAbstractFactory as szAbstractFactoryCreator, SzAbstractFactoryOptions, SzEngineFlags } from '../../dist/@senzing/sz-sdk-typescript-grpc';

const SzAbstractFactory         = new szAbstractFactoryCreator(`0.0.0.0:8261`);
const szEngine                  = SzAbstractFactory.createEngine();

szEngine.whyEntities(
    1,
    4,
    SzEngineFlags.SZ_SEARCH_BY_ATTRIBUTES_DEFAULT_FLAGS,
).
then((result) => {
    console.log(`RESULT: ${result}`);
}).catch((err) => {
    console.error(err);
})