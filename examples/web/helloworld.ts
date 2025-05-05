import { SzGrpcWebProduct } from '@senzing/sz-sdk-typescript-grpc';

const szProduct  = new SzGrpcWebProduct({connectionString: `0.0.0.0:8261`});

szProduct.getVersion().
    then((result)=>{
        console.log("RESPONSE:\n\r", result);
    }).
    catch((err)=>{
        console.error(err);
    });