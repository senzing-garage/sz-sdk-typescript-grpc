import { SzAbstractFactory as szAbstractFactoryCreator, SzAbstractFactoryOptions, SzEngineFlags } from '../../dist/@senzing/sz-sdk-typescript-grpc';

const SzAbstractFactory         = new szAbstractFactoryCreator(`0.0.0.0:8261`);
const szEngine                  = SzAbstractFactory.createEngine();

const FLAGS                     = SzEngineFlags.SZ_FIND_NETWORK_DEFAULT_FLAGS;
const BUILD_OUT_DEGREES         = 1;
const MAX_DEGREES               = 2;
const MAX_ENTITIES              = 10;
const ENTITY_IDS                = [1, 4];

szEngine.findNetworkByEntityId(ENTITY_IDS, MAX_DEGREES, BUILD_OUT_DEGREES, MAX_ENTITIES, FLAGS).then((result) => {
    console.log(`RESULT: ${result}`);
}).catch((err) => {
    console.error(err);
})