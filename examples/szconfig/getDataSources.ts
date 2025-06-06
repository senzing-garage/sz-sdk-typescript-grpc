import { SzGrpcEnvironment } from '@senzing/sz-sdk-typescript-grpc';

const szEnvironment         = new SzGrpcEnvironment({connectionString: `0.0.0.0:8261`});

// create new config and get handle
szEnvironment.configManager.createConfig().then((config) => {

    // now get datasources from config
    config.getDataSources().
    then((result)=>{
        console.log("DATA SOURCES:\n\r", result);
    }).
    catch((err)=>{
        console.error(err);
    });

}).catch((err) => {
    console.error(err);
})