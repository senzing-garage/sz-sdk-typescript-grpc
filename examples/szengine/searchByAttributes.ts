import { SzAbstractFactory as szAbstractFactoryCreator, SzAbstractFactoryOptions, SzEngineFlags } from '../../dist/@senzing/sz-sdk-typescript-grpc';

const SzAbstractFactory         = new szAbstractFactoryCreator(`0.0.0.0:8261`);
const szEngine                  = SzAbstractFactory.createEngine();
const ATTRIBUTES                = {
    "NAME_FULL": "BOB SMITH", 
    "EMAIL_ADDRESS": "bsmith@work.com"
};

szEngine.searchByAttributes(
    ATTRIBUTES, 
    SzEngineFlags.SZ_SEARCH_BY_ATTRIBUTES_DEFAULT_FLAGS,
    "").
then((result) => {
    console.log(`RESULT: ${result}`);
}).catch((err) => {
    console.error(err);
})