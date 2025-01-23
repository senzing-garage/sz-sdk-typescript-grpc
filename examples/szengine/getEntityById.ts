import { SzAbstractFactory as szAbstractFactoryCreator, SzAbstractFactoryOptions, SzEngineFlags } from '../../dist/@senzing/sz-sdk-typescript-grpc';

const SzAbstractFactory         = new szAbstractFactoryCreator(`0.0.0.0:8261`);
const szEngine                  = SzAbstractFactory.createEngine();

szEngine.getEntityByEntityId(1, SzEngineFlags.SZ_ENTITY_DEFAULT_FLAGS).then((result) => {
    console.log(`RESULT: ${result}`);
}).catch((err) => {
    console.error(err);
})