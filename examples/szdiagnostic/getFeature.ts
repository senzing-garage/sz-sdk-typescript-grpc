import { SzAbstractFactory } from '../../dist/@senzing/sz-sdk-typescript-grpc';

const szParamFactory = new SzAbstractFactory(`0.0.0.0:8261`);
const szDiagnostic   = szParamFactory.createDiagnostic();
const FEATURE_ID     = 1;

szDiagnostic.getFeature(FEATURE_ID).then((resp) => {
    console.log(`FEATURE #${FEATURE_ID}:\n${resp}`);
}).catch((err) => {
    console.error(err);
})