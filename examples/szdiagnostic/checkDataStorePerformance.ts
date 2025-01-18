import { SzAbstractFactory, SzAbstractFactoryOptions } from '../../dist/@senzing/sz-sdk-typescript-grpc';
import { CHECK_DATASTORE_PERFORMANCE_RESPONSE } from '../../dist/@senzing/sz-sdk-typescript-grpc/types/szDiagnostic';

const szParamFactory = new SzAbstractFactory(`0.0.0.0:8261`);
const szDiagnostic   = szParamFactory.createDiagnostic();

// create new config and get handle #1
szDiagnostic.checkDataStorePerformance(3).then((resp) => {
    console.log(`DATA STORE PERFORMANCE:\n`, JSON.stringify(resp, undefined, 4));
}).catch((err) => {
    console.error(err);
})