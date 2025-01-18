import { SzAbstractFactory } from '../../dist/@senzing/sz-sdk-typescript-grpc';

const szParamFactory = new SzAbstractFactory(`0.0.0.0:8261`);
const szDiagnostic   = szParamFactory.createDiagnostic();

// ------------ WARNING
// ------------ This will remove all loaded and entity resolved data from the Senzing repository, use with caution!
// ------------ WARNING
console.log(`------------ WARNING`);
console.log(`This will remove all loaded and entity resolved data from the Senzing repository, use with caution!`);
console.log(`------------ WARNING`);
console.log(`------------ Ctrl+C to abort`);

// wait 5s just in case the user wants to cancel script execution
(() => { return new Promise(resolve => { setTimeout(resolve, 5000); })})()
    .then(()=>{
        szDiagnostic.purgeRepository();
        console.log('purge started...');
    });
// now actually purge
