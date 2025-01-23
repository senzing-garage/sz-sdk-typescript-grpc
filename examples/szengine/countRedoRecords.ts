import { SzAbstractFactory as szAbstractFactoryCreator, SzAbstractFactoryOptions } from '../../dist/@senzing/sz-sdk-typescript-grpc';

const SzAbstractFactory        = new szAbstractFactoryCreator(`0.0.0.0:8261`);
const szEngine                 = SzAbstractFactory.createEngine();

szEngine.countRedoRecords().then((result) => {
    console.log(`Redo Records: ${result}`);
}).catch((err) => {
    console.error(err);
})