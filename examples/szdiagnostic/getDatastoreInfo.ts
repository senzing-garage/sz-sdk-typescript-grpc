import { SzAbstractFactory } from '../../dist/@senzing/sz-sdk-typescript-grpc';

const szParamFactory = new SzAbstractFactory(`0.0.0.0:8261`);
const szDiagnostic   = szParamFactory.createDiagnostic();

szDiagnostic.getDatastoreInfo().then((resp) => {
    console.log(`DATA STORE INFO:\n${resp}`);
}).catch((err) => {
    console.error(err);
})