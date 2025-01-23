import { SzAbstractFactory as szAbstractFactoryCreator, SzAbstractFactoryOptions } from '../../dist/@senzing/sz-sdk-typescript-grpc';

const SzAbstractFactory        = new szAbstractFactoryCreator(`0.0.0.0:8261`);
const szConfig              = SzAbstractFactory.createConfig();
const DATASOURCES_TO_ADD    = ['CUSTOMERS']; // works
//const DATASOURCES_TO_ADD    = ['CUSTOMERS', 'REFERENCE', 'WATCHLIST']; // doesn't work

// create new config and get handle
szConfig.createConfig().then((configHandle) => {
    // now get datasources from config
    let promises: Array<Promise<string>> = [];
    DATASOURCES_TO_ADD.forEach((DATA_SOURCE_CODE) => {
        promises.push( szConfig.addDataSource(configHandle as number, DATA_SOURCE_CODE) );
    });
    Promise.all(promises).then((results) => {
        console.log('Added DataSources: ', results);
    })
    /*szConfig.addDataSource(configHandle as number, DATA_SOURCE_CODE).
    then((result)=>{
        console.log(`ADDED to #${configHandle}:\n\r`, result);

        // just for debug lets list out datasources
        szConfig.exportConfig(configHandle as number).then((conf) => {
            console.log(`new config: \n\r`, conf);
        });
        
        szConfig.getDataSources(configHandle as number).
        then((_result)=>{
            console.log(`#${configHandle} DATA SOURCES:\n\r`, _result);
            szConfig.closeConfig(configHandle as number);
        });
    }).
    catch((err)=>{
        console.error(err);
    });*/
    
}).catch((err) => {
    console.error(err);
})