import { SzEnvironment, SzEngineFlags } from '@senzing/sz-sdk-typescript-grpc';

const szEnvironment  = new SzEnvironment({connectionString: `0.0.0.0:8261`});

szEnvironment.product.getLicense().
    then((result)=>{
        console.log("RESPONSE:\n\r", result);
    }).
    catch((err)=>{
        console.error(err);
    });