import { SzGrpcEnvironment } from '@senzing/sz-sdk-typescript-grpc';

const szEnvironment         = new SzGrpcEnvironment({connectionString: `0.0.0.0:8261`});

szEnvironment.diagnostic.getDatastoreInfo().then((resp) => {
    console.log(`DATA STORE INFO:\n${resp}`);
}).catch((err) => {
    console.error(err);
})