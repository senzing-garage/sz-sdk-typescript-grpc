import { SzEnvironment } from '@senzing/sz-sdk-typescript-grpc';

const szEnvironment         = new SzEnvironment({connectionString: `0.0.0.0:8261`});

// create new config and get handle
szEnvironment.config.createConfig().then((configHandle) => {

    // now get datasources from config
    szEnvironment.config.getDataSources(configHandle as number).
    then((result)=>{
        console.log("DATA SOURCES:\n\r", result);
    }).
    catch((err)=>{
        console.error(err);
    });

}).catch((err) => {
    console.error(err);
})