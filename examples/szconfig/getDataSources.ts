import { SzAbstractFactory, SzAbstractFactoryOptions } from '../../dist/@senzing/sz-sdk-nodejs-grpc';

const szParamFactory = new SzAbstractFactory(`0.0.0.0:8261`);
const szConfig      = szParamFactory.createConfig();

// create new config and get handle
szConfig.createConfig().then((configHandle) => {

    // now get datasources from config
    szConfig.getDataSources(configHandle as number).
    then((result)=>{
        console.log("DATA SOURCES:\n\r", result);
    }).
    catch((err)=>{
        console.error(err);
    });

}).catch((err) => {
    console.error(err);
})