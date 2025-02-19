import { SzGrpcEnvironment } from '@senzing/sz-sdk-typescript-grpc';

const szEnvironment         = new SzGrpcEnvironment({connectionString: `0.0.0.0:8261`});
const DATASOURCES_TO_ADD    = ['CUSTOMERS', 'REFERENCE', 'WATCHLIST'];

// create new config and get handle
szEnvironment.getConfig().createConfig().then((configHandle) => {
    // now add datasources
    szEnvironment.getConfig().addDataSources(configHandle as number, DATASOURCES_TO_ADD).then((results) => {
        console.log(`Added Data Sources: \n\r`, results);
    }).
    catch((err) => {
        console.error(err);
    });
}).catch((err) => {
    console.error(err);
})