import { SzGrpcEnvironment } from '@senzing/sz-sdk-typescript-grpc';

const szEnvironment         = new SzGrpcEnvironment({connectionString: `0.0.0.0:8261`});
const DATA_SOURCE_CODE  = "NAME_OF_DATASOURCE"

// create new config and get handle
szEnvironment.config.createConfig().then((configHandle) => {
    // now get datasources from config
    szEnvironment.config.deleteDataSource(configHandle as number, DATA_SOURCE_CODE).
    then(()=>{
        // just for debug lets list out datasources
        szEnvironment.config.getDataSources(configHandle as number).
        then((result)=>{
            console.log("DATA SOURCES:\n\r", result);
        }).
        catch((err)=>{
            console.error(err);
        }).finally(() => {
            szEnvironment.config.closeConfig(configHandle as number);
        })
    }).
    catch((err)=>{
        console.error(err);
    });
    
}).catch((err) => {
    console.error(err);
})