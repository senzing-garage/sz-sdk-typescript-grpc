import { SzAbstractFactory as szAbstractFactoryCreator, SzAbstractFactoryOptions, SzEngineFlags } from '../../dist/@senzing/sz-sdk-typescript-grpc';

const SzAbstractFactory         = new szAbstractFactoryCreator(`0.0.0.0:8261`);
const szEngine                  = SzAbstractFactory.createEngine();

const FLAGS                     = SzEngineFlags.SZ_FIND_NETWORK_DEFAULT_FLAGS;

szEngine.findPathByRecordId(
    "CUSTOMERS", 
    "1001", 
    "CUSTOMERS", 
    "1009", 
    2, 
    [], 
    [], 
    FLAGS).
then((result) => {
    console.log(`RESULT: ${result}`);
}).catch((err) => {
    console.error(err);
})