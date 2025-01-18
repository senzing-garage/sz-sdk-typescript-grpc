import { SzAbstractFactory, SzAbstractFactoryOptions } from '../../dist/@senzing/sz-sdk-typescript-grpc';

const szParamFactory    = new SzAbstractFactory(`0.0.0.0:8261`);
const szConfig          = szParamFactory.createConfig();
const DATA_SOURCE_CODE  = "NAME_OF_DATASOURCE";

// create new config and get handle
szConfig.createConfig().then((configHandle) => {
    // now get datasources from config
    szConfig.addDataSource(configHandle as number, DATA_SOURCE_CODE).
    then((result)=>{
        console.log(`ADDED to #${configHandle}:\n\r`, result);

        // just for debug lets list out datasources
        szConfig.getDataSources(configHandle as number).
        then((_result)=>{
            console.log(`#${configHandle} DATA SOURCES:\n\r`, _result);
            szConfig.closeConfig(configHandle as number);
        });
    }).
    catch((err)=>{
        console.error(err);
    });
    
}).catch((err) => {
    console.error(err);
})