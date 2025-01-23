import { SzAbstractFactory, SzEngineFlags } from '../../dist/@senzing/sz-sdk-typescript-grpc';

const szParamFactory = new SzAbstractFactory(`0.0.0.0:8261`);
const szEngine       = szParamFactory.createEngine();

szEngine.reevaluateEntity(1, SzEngineFlags.SZ_WITH_INFO).then((result) => {
    console.log(`RESULT: ${result}`);
}).catch((err) => {
    console.error(err);
});