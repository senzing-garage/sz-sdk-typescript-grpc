import { SzGrpcEnvironment } from '@senzing/sz-sdk-typescript-grpc';

const szEnvironment         = new SzGrpcEnvironment({connectionString: `0.0.0.0:8261`});
const DATA_SOURCE_CODE      = 'CUSTOMERS'; 

// create new config and get handle
szEnvironment.getConfig().createConfig().then((configHandle) => {
    szEnvironment.getConfig().addDataSource(configHandle as number, DATA_SOURCE_CODE).
    then((result)=>{
        console.log(`ADDED to #${configHandle}:\n\r`, result);
    }).
    catch((err)=>{
        console.error(err);
    });
    
}).catch((err) => {
    console.error(err);
})