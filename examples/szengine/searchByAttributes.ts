import { SzGrpcEnvironment, SzEngineFlags } from '@senzing/sz-sdk-typescript-grpc';

const szEnvironment  = new SzGrpcEnvironment({connectionString: `0.0.0.0:8261`});
const ATTRIBUTES                = {
    "NAME_FULL": "BOB SMITH", 
    "EMAIL_ADDRESS": "bsmith@work.com"
};

szEnvironment.engine.searchByAttributes(
    ATTRIBUTES, 
    SzEngineFlags.SZ_SEARCH_BY_ATTRIBUTES_DEFAULT_FLAGS,
    "").
then((result) => {
    console.log(`RESULT: ${result}`);
}).catch((err) => {
    console.error(err);
})