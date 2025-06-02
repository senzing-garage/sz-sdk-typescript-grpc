import { SzGrpcEnvironment } from '@senzing/sz-sdk-typescript-grpc';

const szEnvironment         = new SzGrpcEnvironment({connectionString: `0.0.0.0:8261`});
const DATASOURCES_TO_ADD    = ['CUSTOMERS', 'REFERENCE', 'WATCHLIST'];

// create new config and get handle
szEnvironment.getConfigManager().createConfig().then((config) => {
    // now add datasources
    config.addDataSources(DATASOURCES_TO_ADD).then((results) => {
        console.log(`Added Data Sources: \n\r`, results);
    }).
    catch((err) => {
        console.error(err);
    });
}).catch((err) => {
    console.error(err);
})