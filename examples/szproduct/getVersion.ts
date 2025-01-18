import { SzAbstractFactory, SzAbstractFactoryOptions } from '../../dist/@senzing/sz-sdk-typescript-grpc';

const szParamFactory = new SzAbstractFactory(`0.0.0.0:8261`);
const szProduct      = szParamFactory.createProduct();

szProduct.getVersion().
    then((result)=>{
        console.log("RESPONSE:\n\r", result);
    }).
    catch((err)=>{
        console.error(err);
    });