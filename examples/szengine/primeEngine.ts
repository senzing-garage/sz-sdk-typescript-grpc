import { SzAbstractFactory } from '../../dist/@senzing/sz-sdk-nodejs-grpc';

const szParamFactory = new SzAbstractFactory(`0.0.0.0:8261`);
const szEngine       = szParamFactory.createEngine();

szEngine.primeEngine().then((res) => {
    console.log('engine priming');
});