import { SzAbstractFactory, SzEngineFlags } from '../../dist/@senzing/sz-sdk-nodejs-grpc';
import { SzEngine } from '../../dist/@senzing/sz-sdk-nodejs-grpc/szEngine';

const szParamFactory = new SzAbstractFactory(`0.0.0.0:8261`);
const szEngine       = szParamFactory.createEngine();

const DATA_SOURCE_CODE  = "TEST";
const FLAGS             = SzEngineFlags.SZ_WITH_INFO;
const MAX_TIME          = 5000;
let   RESULT            = "";

szEngine.exportJsonEntityReport(FLAGS).then((resp) => {
    console.log(`resp: \n`, resp);
}, (err)=>{
    console.error(err);
});

/*exportStream.on('data', (fragment) => {
    if((fragment as string).length === 0) {
        // close connection
        //exportStream.end();
        console.log('STEAM ENDED');
    }
    RESULT += fragment;
    console.log(`added fragment "${fragment}"`, fragment);
});
for(const fragment of exportStream) {
    
}
exportStream.on('end', () => {
    console.log(`RESULT: \n`, RESULT);
});*/