import { SzAbstractFactory, SzEngineFlags } from '../../dist/@senzing/sz-sdk-nodejs-grpc';
import { SzEngine } from '../../dist/@senzing/sz-sdk-nodejs-grpc/szEngine';

const szParamFactory = new SzAbstractFactory(`0.0.0.0:8261`);
const szEngine       = szParamFactory.createEngine();

const DATA_SOURCE_CODE = "TEST";
const FLAGS = SzEngineFlags.SZ_WITH_INFO;
const RECORD_DEFINITION = {
    "RECORD_TYPE": "PERSON",
    "PRIMARY_NAME_LAST": "Smith",
    "PRIMARY_NAME_FIRST": "Robert",
    "DATE_OF_BIRTH": "12/11/1978",
    "ADDR_TYPE": "MAILING",
    "ADDR_LINE1": "123 Main Street, Las Vegas NV 89132",
    "PHONE_TYPE": "HOME",
    "PHONE_NUMBER": "702-919-1300",
    "EMAIL_ADDRESS": "bsmith@work.com",
    "DATE": "1/2/18",
    "STATUS": "Active",
    "AMOUNT": "100"
};
/*const RECORD_DEFINITION = '{'+
    '"RECORD_TYPE":"PERSON",'+
    '"PRIMARY_NAME_LAST":"Smith",'+
    '"PRIMARY_NAME_FIRST":"Robert",'+
    '"DATE_OF_BIRTH":"12/11/1978",'+
    '"ADDR_TYPE":"MAILING",'+
    '"ADDR_LINE1":"123 Main Street, Las Vegas NV 89132",'+
    '"PHONE_TYPE":"HOME",'+
    '"PHONE_NUMBER":"702-919-1300",'+
    '"EMAIL_ADDRESS":"bsmith@work.com",'+
    '"DATE":"1/2/18",'+
    '"STATUS":"Active",'+
    '"AMOUNT":"100"'+
'}';*/
const RECORD_ID = "1";

async function fetchNext(exportHandle, RESULT) {
    let exportDone      = false;
    while(!exportDone) {
        await szEngine.fetchNext(exportHandle).then((fragment) => {
            if(fragment && (fragment as string).length === 0) {
                // last frag
                exportDone = true;
            }
            RESULT += fragment;
        });
    }
}

async function startExport() {
    let exportHandle = -1;
    await szEngine.exportJsonEntityReport(FLAGS).then((_exportHandle)=>{
        exportHandle = _exportHandle as number;
    });
    return exportHandle;
}
/*
async function main() {
    let exportResult = "";
    await szEngine.exportJsonEntityReport(FLAGS).then((exportHandle)=>{
        console.log('exportHandle: '+ exportHandle);
        // got export handle
        await loop(exportHandle);
    })

    return new Promise((resolve, reject)=>{
        szEngine.exportJsonEntityReport(FLAGS).then((exportHandle)=>{
            console.log('exportHandle: '+ exportHandle);
            // got export handle
            await loop(exportHandle);
        })
        let exportResult = "";
    });
}*/

let EXPORT_HANDLE = -1;
await startExport().then((exportHandle) => {
    EXPORT_HANDLE = exportHandle;
});

if(EXPORT_HANDLE > 0){
    console.log(`EXPORT STARTED: "${EXPORT_HANDLE}"`);
    // do fetch on async loop
    let RESULT = "";
    await fetchNext(EXPORT_HANDLE, RESULT);
    console.log(`EXPORT: \n`, RESULT);
}



/*
szEngine.addRecord(DATA_SOURCE_CODE, RECORD_ID, RECORD_DEFINITION).then((resp) => {
    console.log(`RESULT #${RECORD_ID}:\n${resp}`);
    SzEngine.exportJsonEntityReport(FLAGS).then((exportHandle)=>{
        console.log('exportHandle: '+ exportHandle);
    })
    let exportResult = "";

}).catch((err) => {
    console.error(err);
})*/