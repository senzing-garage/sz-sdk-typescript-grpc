import { SzAbstractFactory as szAbstractFactoryCreator, SzAbstractFactoryOptions, SzEngineFlags } from '../../dist/@senzing/sz-sdk-typescript-grpc';

const SzAbstractFactory         = new szAbstractFactoryCreator(`0.0.0.0:8261`);
const szEngine                  = SzAbstractFactory.createEngine();
const DATA_SOURCE_CODE          = "TEST";
const FLAGS                     = SzEngineFlags.SZ_WITH_INFO
const RECORD_ID                 = "1";

szEngine.deleteRecord(DATA_SOURCE_CODE, RECORD_ID, FLAGS).then((result) => {
    console.log(`Redo Records: ${result}`);
}).catch((err) => {
    console.error(err);
})