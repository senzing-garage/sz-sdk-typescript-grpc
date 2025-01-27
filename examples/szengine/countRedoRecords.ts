import { SzEnvironment } from '@senzing/sz-sdk-typescript-grpc';

const szEnvironment  = new SzEnvironment({connectionString: `0.0.0.0:8261`});

szEnvironment.engine.countRedoRecords().then((result) => {
    console.log(`Redo Records: ${result}`);
}).catch((err) => {
    console.error(err);
})