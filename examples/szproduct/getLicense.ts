import { SzGrpcEnvironment } from '@senzing/sz-sdk-typescript-grpc';

const szEnvironment  = new SzGrpcEnvironment({connectionString: `0.0.0.0:8261`});

szEnvironment.product.getLicense().
    then((result)=>{
        console.log("RESPONSE:\n\r", result);
    }).
    catch((err)=>{
        console.error(err);
    });